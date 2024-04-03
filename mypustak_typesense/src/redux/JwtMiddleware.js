"use client"
import axios from 'axios';
import { refreshToken,getAllDetails, usingMiddleWare } from './actions/loginactions';
import { url } from '../helper/api_url';
import { Unbxd } from '../helper/helpers';

export function jwt({ dispatch, getState }) {
	return (next) => (action) => {
		// console.log('A j');

		// only worry about expiring token for async actions
		if (typeof action === 'function') {
			// console.log('Action jwt function', action);

		
			const set_unbxd_visitid = () => {
				var visitId = Unbxd.readCookie(Unbxd.cookies.visitId);
				var now = new Date().getTime();
				// var expire = new Date(now + 30 * 1000); // Set the expiration time to 30 seconds from now
				var expire = new Date(now + 30 * 60000);
				if (!visitId) {
				  visitId = 'visitId-' + now + '-' + Math.floor(Math.random() * 100000);
				}
			  
				Unbxd.setCookie(Unbxd.cookies.visitId, visitId, expire);
			  };


			set_unbxd_visitid()
			if (!getState().loginReducer.logout) {
				if (!getState().loginReducer.token) {
					if (typeof window !== 'undefined') {
						// decode jwt so that we know if and when it expires
						const getCookieArr = document.cookie.split('; ');
						// console.log({getCookieArr});

						const cookieDetails = getCookieArr.filter((e) => e.startsWith('I='));
						// console.log({ cookieDetails });
						if (cookieDetails.length) {
							cookieDetails
							const details = cookieDetails[0].replace('I=', '');
							const jsonDetails = JSON.parse(details);
							const accessToken = jsonDetails.access;
							const parsedTokeData = JSON.parse(atob(accessToken.split('.')[1]));
							const { exp } = parsedTokeData;
							const tokenExpiration = exp * 1000;
							const refreshToken = jsonDetails.refresh;
							if (tokenExpiration && tokenExpiration - Date.now() < 5000) {
								// make sure we are not already refreshing the token
								// if (!getState().auth.freshTokenPromise) {
								// console.log('[mr]');
								let body = { "refresh": `${refreshToken}` }

								axios
									.post(`${url}/core/api/token/refresh`, body)
									.then((res) => {
										// alert("refresh")
										// console.log('Login refresh');
										let fourteenDaysMs = 60 * 60 * 24 * 14 * 1000;
										let date = new Date(Date.now() + fourteenDaysMs);
										let strinifyData = JSON.stringify(res.data);
										// console.log(`I=${strinifyData};expires=${date};`,exp);
										dispatch(usingMiddleWare())
										document.cookie = `I=${strinifyData};expires=${date};`;
										return next(getAllDetails(res.data));

									})
									.catch((err) => {
										// alert("refresherr")
										console.log(err);
									});
								// return refreshToken().then(() => next(action));
								// } else {
								//     return getState().auth.freshTokenPromise.then(() => next(action));
								// }
							} else {
								// console.log({"oo":getState().accountR});
								if (getState().loginReducer.getuserdetails.email == null) {
									return next(getAllDetails(jsonDetails));

								}
								// console.log('[mnr]');
							}
						} else {
							// console.log({ msg: 'No cookie found' });
						}

						// }
					} else {
						// console.log('On server side');
					}
				} else {
					// console.log('[mu]');

				}
			}
		} else {
			// console.log('not action function jwt', action);
		}
		console.log('not action function jwtdff', action);

		return next(action);
	};
}

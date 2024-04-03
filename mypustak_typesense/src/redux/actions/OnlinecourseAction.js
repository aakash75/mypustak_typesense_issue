import {
	CREATE_SUBSCRIPTION,
	FETCH_SUB_SUCCESS,
	FETCH_SUB_FAIL,
	GENERATEd_SUB_PAYMENT_ID,
	UPDATE_USER_DETAILS,
	FETCH_USER_DETAILS,
	FETCH_USER_DETAILS_LOADER,
	FETCH_SUBSCRIBER,
	FETCH_SUBSCRIBER_FAILED,
	SEARCH_SUBSCRIBER,
} from "../constants/types"
import axios from 'axios';
// import config from 'react-global-configuration';
// import AuthInstance from '../../lib/authAxios'
import { AuthInstance, url } from "../../helper/api_url";
// export const create_subscription

export const fetchSubDetails = (userId) => (dispatch) => {

	return new Promise((resolve, reject) => {
		AuthInstance
			.get(`${url}/api/courses/fetch_user_subscription/${userId}`)
			.then((res) => {
				// console.log({ res });
				dispatch({
					type: FETCH_SUB_SUCCESS,
					payload: res.data.subscription_obj
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });
				dispatch({
					type: FETCH_SUB_FAIL
				});
				resolve(false);
			});
	});
};

export const create_subscription = (body) => (dispatch) => {
	// alert("hodd")
	// console.log(body, 'subscribebody');
	// let header = {
	// 	headers: {
	// 		Authorization: `Token ${token}`
	// 	}
	// };
	return new Promise((resolve, reject) => {
		AuthInstance
			.post(`${url}/api/courses/create_user_subscription`, body)
			.then((res) => {
				// console.log(res.data, 'subscribe');
				dispatch({
					type: CREATE_SUBSCRIPTION,
					payload: res.data.data
				});
				resolve(true);
			})
			.catch((err) => {
				resolve(false);
				console.log('some error found', err);
			});
	});
};

export const generatePaymentId = (body) => (dispatch) => {
	return new Promise((resolve, reject) => {
		AuthInstance
			.post(`${url}/api/courses/create_course_payment`, body)
			.then((res) => {
				dispatch({
					type: GENERATEd_SUB_PAYMENT_ID,
					payload: res.data
				});
				// console.log({ res });
				resolve(true);
			})
			.catch((err) => {
				console.log('some error found', err);
				resolve(false);
			});
	});
};

export const update_user_detail = (body, userId) => (dispatch) => {

	return new Promise((resolve, reject) => {
		AuthInstance
			.patch(`${url}/core/update_user_details/${userId}`, body)
			.then((res) => {
				// console.log({ res });
				dispatch({
					type: UPDATE_USER_DETAILS,
					payload: ""
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });

				resolve(false);
			});
	});
};

export const fetch_user_detail = (userId,) => (dispatch) => {
	// alert("hi")

	return new Promise((resolve, reject) => {
		AuthInstance
			.get(`${url}/core/fetch_user_details/${userId}`)
			.then((res) => {
				// console.log({ res });
				dispatch({
					type: FETCH_USER_DETAILS,
					payload: res.data
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });

				resolve(false);
			});
	});
};


export const fetch_all_subscriber = ({ page }) => (dispatch) => {

	return new Promise((resolve, reject) => {
		AuthInstance.get(
			`${url}/api/courses/fetch_Subscription/${page + 1}`
		)
			.then((res) => {
				console.log(res.data.sub_count, "555555");
				dispatch({
					type: FETCH_SUBSCRIBER,
					payload: { data: res.data.output, sub_count: res.data.sub_count, page },
				})
				resolve(true)
			})
			.catch((err) => {
				console.log({ err })
				dispatch({
					type: FETCH_SUBSCRIBER_FAILED,
				})
				resolve(false)
			})
	})
}

export const search_subscriber = ({ searchValue }) => (dispatch) => {
	// alert("555")
	return new Promise((resolve, reject) => {
		AuthInstance.get(
			`${url}/api/courses/search_subscriber/${searchValue}`
		)
			.then((res) => {
				console.log(res, "555555")
				dispatch({
					type: SEARCH_SUBSCRIBER,
					payload: { data: res.data.output, },
				})
				resolve(true)
			})
			.catch((err) => {
				console.log({ err })
				dispatch({
					type: FETCH_SUBSCRIBER_FAILED,
				})
				resolve(false)
			})
	})
}
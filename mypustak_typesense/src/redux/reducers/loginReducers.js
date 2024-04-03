import {
    LOGIN,
    SIGNUP,
    SIGNEDUP,
    LOGINFAILS,
    LOGOUT,
    SHOWLOADER,
    GETADDRESS,
    GETUSERD,
    CLEARAFTERLOGINREDIRECT,
    AFTERLOGINREDIRECT,
    EDITUSER_ADD,
    EDITADDRESS,
    ADD_ADDRESS,
    SAVEDINFO,
    GETSELECTEDADDRESS,
    CLEARALL,
    CLEARALLUSERSTATUS,
    CLEARLOGINERR,
    ACTIVATESUCCESSPOPUP,
    ACTIVATESUCCESSPOPUPOTHER,
    SETSELECTEDADDRESSBLANK,
    NAVURL,
    LOGINBACKDROP,
    LOADING_ADDRESS,
    LOADING_ADD_ADDRESS_FALSE,
    LOADING_ADD_ADDRESS,
    FETCH_USERS_DETAIL,
    OTP_SUCCESS_REQUEST,
    OTP_FALIURE_REQUEST,
    USING_MIDDLEWARE,
      LOGIN_DONE_MSG,
    UPDATE_USER_COMPONENT,
    CHECK_LOGIN_USERMSG
  } from "../constants/types"

const initialState = {
	cart_len: 0,
	LoginBackdrop: false,
	userDistinct: [],
	getuserdetails: {},
	getadd: [],
	getuseradd: {},
	editadd: {},
	userId: undefined,
	status: "",
	token: null,
	// userId:6059,
	acount: [],
	selectedAddress: [],
	ErrMsg: [],
	loading: false,
	// getadd:[],
	SignUpErrMsg: "",
	ActivateSuccPopupState: false,
	ActivateSuccPopupOtherState: false,
	navurlstate: false,
	afterLoginSuccess: "",
	user_role_id: 0,
	adding_address_loader: false,
	fetching_address_loader: false,
	accessTokenExpTime: 0,
	otp_valid_upto: 0,
	logout: 0,
	using_middleware: 0,
	loginSuccess: false,
	check_login_msg: "",
	userComponentStatus: 0, // 0 -> comoponent not mounted 1 -> mounted not login 2 -> login and mounted
	// added_address:'',
	// donation_req_id:'123456',
	// app_books_weight:'',
	// email:'mukul.meri@gmail.com',
	// name:'abc xyz'
  };

export default function loginReducer (state=initialState,action){
    switch(action.type){
        case LOGINBACKDROP:
			return {
				...state,
				LoginBackdrop: !state.LoginBackdrop
			};
		case SHOWLOADER:
			return {
				...state,
				loading: true
			};
		case LOGIN:
			const accessToken = action.payload.access
			let parsedTokeData
				try {
					parsedTokeData=  JSON.parse(atob(accessToken.split('.')[1]));
				} catch (e) {
					 console.log({e});
					 
				}
				let user = JSON.parse(localStorage.getItem('user_info'));
				
			// console.log({ parsedTokeData });
			// document.cookie=`Autharization=${accessToken}`
			// console.log('-----------');
			// {{local}}/core/fetch_user_details/93733 S:"d1t17aW8nP10yPz9TPz8/PDZeP92g74bTVKBuNHAc5IXDBMTUXB3WzhnTVBu2iMxuXhy+NduOR+k85cuYqA6B09Swog=="
			
				const {exp} = parsedTokeData
				return {
					...state,
					token: action.payload ,
					// user_role_id: action.payload.user_role_id,
					loading: false,
					LoginBackdrop: false,
					accessTokenExpTime: exp,
					loginSuccess:true,
					logout: 0,
					userComponentStatus:2,
					
			}
		case SAVEDINFO:
			// alert("logoutSuccess")
			// console.log(action.payload.Token)
			return {
				...state,
				token: action.payload
				// loading: false
			};
		case CLEARALL:
			// alert("logoutSuccess")
			// console.log(action.payload.Token)
			return {
				...state,
				SignUpErrMsg: ''
			};
		case CLEARLOGINERR:
			// alert("CL")
			// console.log(action.payload.Token)
			return {
				...state,
				ErrMsg: ''
			};
		case CLEARALLUSERSTATUS:
			// alert("logoutSuccess")
			// console.log(action.payload.Token)
			return {
				...state,
				status: ''
			};
		case LOGOUT:
			// alert("logoutSuccess")
			// console.log(action.payload.Token)
			return {
				...state,
				token: null,
				loading: false,
				getuserdetails: [],
				getuseradd: {},
				logout:1
			};
		case NAVURL:
			// alert("logoutSuccess")
			// console.log(action.payload.Token)
			return {
				...state,
				navurlstate: !state.navurl
			};
		case AFTERLOGINREDIRECT:
			// alert("logoutSuccess")
			// console.log(action.payload.Token)
			return {
				...state,
				afterLoginSuccess: action.payload
			};
		case CLEARAFTERLOGINREDIRECT:
			// alert("logoutSuccess")
			// console.log(action.payload.Token)
			return {
				...state,
				afterLoginSuccess: ''
			};
		case ACTIVATESUCCESSPOPUP:
			// alert("logoutSuccess")
			// alert("b")
			// console.log(action.payload.Token)
			return {
				...state,
				ActivateSuccPopupState: !state.ActivateSuccPopupState
			};
		case ACTIVATESUCCESSPOPUPOTHER:
			// alert("logoutSuccess")
			// alert("b")
			// console.log(action.payload.Token)
			return {
				...state,
				ActivateSuccPopupOtherState: !state.ActivateSuccPopupOtherState
			};
		case LOGINFAILS:
			// alert("loginFails")
			return {
				...state,
				ErrMsg: action.payload,
				loading: false
			};

		case SIGNUP:
			// alert("SignupRed")
			// console.log(action.payload);

			// console.log(action.payload.id)
			localStorage.setItem('user', action.payload.Token);
			// console.log(action.payload);
			
			return {
				...state,
				// acount:[action.payload],
				userId: [ action.payload.id ],
				token: action.payload,
				LoginBackdrop: !state.LoginBackdrop,
				status: 'Thank You For Joining MyPustak Community',
				loading: false,
				logout:0
			};

		case SIGNEDUP:
			// alert("ASigned")
			console.log(action.payload,"55656");

			// console.log(action.payload.id)
			return {
				...state,
				// ErrMsg:action.payload,
				SignUpErrMsg: action.payload.errMsg,
				check_login_msg:action.payload.data,
				loading: false
			};

		case GETADDRESS:
			// alert("hi")
			// console.log(action.payload.output,"123456")
			return {
				...state,
				getadd: action.payload.output,
				fetching_address_loader: false
			};

		case ADD_ADDRESS:
			// alert('redu')
			return {
				...state,
				// getadd:action.payload.output,
				getuseradd: action.payload,
				adding_address_loader: false
			};
		case EDITUSER_ADD:
			// alert('redu')
			return {
				...state,
				getuseradd: action.payload,
				adding_address_loader: false
			};
		case EDITADDRESS:
			// alert('redu')
			return {
				...state,
				editadd: action.payload
			};
		case GETSELECTEDADDRESS:
			// alert('redu')
			return {
				...state,
				selectedAddress: action.payload
			};
		case SETSELECTEDADDRESSBLANK:
			// alert('redu')
			return {
				...state,
				selectedAddress: []
			};
		case GETUSERD:

			console.log(action.payload,"5555")
			return {
				...state,
				getuserdetails: action.payload
			};
		case LOADING_ADD_ADDRESS:
			return {
				...state,
				adding_address_loader: !state.adding_address_loader
			};

		case LOADING_ADDRESS:
			// alert("ok")
			return {
				...state,
				fetching_address_loader: !state.adding_address_loader
			};

		case LOADING_ADD_ADDRESS_FALSE:
			// alert("ok")
			return {
				...state,
				adding_address_loader: false
			};
		case FETCH_USERS_DETAIL:
			// console(action.payload,"98811")
			return {
        ...state,
        userDistinct:action.payload
			}
		case OTP_SUCCESS_REQUEST:
			return {
				...state,
				otp_valid_upto:Number(action.payload.valid_till)
			}
		case USING_MIDDLEWARE:
			return {
				...state,
				using_middleware:action.payload
			}
		
		case LOGIN_DONE_MSG:
			// alert(action.payload)
			return {
				...state,
				loginSuccess:action.payload,
			}
		case UPDATE_USER_COMPONENT:
			return {
				...state,
				userComponentStatus:action.payload
			}
		case CHECK_LOGIN_USERMSG:
			// console.log(action.payload.response[0],"565999")
			return{
				...state,
				check_login_msg:action.payload.response[0]
			}
        default:
            return state;
    }
}

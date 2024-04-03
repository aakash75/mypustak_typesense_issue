// import React, { Component } from 'react'
// import { CHANGE_LOGIN,ADD_DONATION,CHANAGE_CATEGORIES ,GET_RP_ID} from "../action/types";
// import { CHANGE_LOGIN,ADD_DONATION,CHANAGE_CATEGORIES ,GET_RP_ID} from "../action/types";
import {
	CHANGE_LOGIN,
	ADD_DONATION,
	CHANAGE_CATEGORIES,
	GET_RP_ID,
	SETPICKUP,
	GETDONATIONHISTORY,
	DONATIONMAILDATA,
	RESETRPID,
	PICKUPDATES,
	QUEUE_NO,
	ISSERVERERROR

} from '../constants/types';
const initialState = {
	visible: false,
	pickup: false,
	donation: [],
	rp_id: 0,
	app_books_weight: '',
	// email:'mukul.meri@gmail.com',
	// name:'abc xyz',
	donationHistoryS: [],
	sendDonationMailData: {},
	donation_req_id: 0,
	free_pickup: [],
	paid_pickup: [],
	kolkata_free_pickup: {},
	queue_no: "",
	avg_rate: "",
	extra_day: "",
	isServerError: false,
};

export default function donationReducer(state = initialState, action) {
	switch (action.type) {
		case CHANGE_LOGIN:
			// alert("changing")
			return {
				...state,
				visible: !state.visible
			};

		case CHANAGE_CATEGORIES:
			return {
				...state,
				categories: [...state.categories, action.payload]
			};

		case ADD_DONATION:
			// alert("adding")
			// console.log(action.payload.id)
			// localStorage.setIte('')
			return {
				...state,
				// donation:[...state.donation,action.payload],
				pickup: !state.pickup,
				donation_req_id: action.payload.donationReqId
				// app_books_weight:[...state.app_books_weight,action.payload.app_books_weight]
				// pickup:!state.pickup,
			};

		case GET_RP_ID:
			// alert("getting")
			// console.log(action.payload.rp_id)
			return {
				...state,
				rp_id: action.payload.rp_id
				// pickup:!state.pickup,
			};
		case RESETRPID:
			return {
				...state,
				rp_id: 0
			};
		case DONATIONMAILDATA:
			// alert("getting")
			// console.log(action.payload.rp_id)
			return {
				...state,
				sendDonationMailData: action.payload
				// pickup:!state.pickup,
			};
		case GETDONATIONHISTORY:
			let data = state.donationHistoryS
			let requestsData = action.payload.requests
			let totalData = data.concat(requestsData)
			return {
				...state,
				donationHistoryS: totalData
				// pickup:!state.pickup,
			};
		case ISSERVERERROR:
			return {
				...state, isServerError: true
			}
		case SETPICKUP:
			// alert("getting")
			// console.log(action.payload.rp_id)
			return {
				...state,
				pickup: false
				// pickup:!state.pickup,
			};

		case PICKUPDATES:
			return {
				...state,
				free_pickup: action.payload.data[0],
				paid_pickup: action.payload.data[1],
				kolkata_free_pickup: action.payload.data[2]
			}

		case QUEUE_NO:
			// alert("jj")
			console.log(action.payload, "quessss")

			return {
				...state,
				queue_no: action.payload.queue_no,
				avg_rate: action.payload.avg_rate,
				extra_day: action.payload.extra_day
			}

		default:
			return state;
	}
}

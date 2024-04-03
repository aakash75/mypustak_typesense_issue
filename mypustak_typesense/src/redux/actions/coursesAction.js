import {
	FETCH_TOPIC_SUCCESS,
	FETCH_TOPIC_FAIL,
	FETCH_SUBTOPIC_SUCCESS,
	FETCH_SUBTOPIC_FAIL,
	FETCH_LECTURE_LIST_SUCCESS,
	FETCH_LECTURE_LIST_FAIL,
	FETCH_LECTURE_SUCCESS,
	FETCH_LECTURE_FAIL,
	ASK_QUESTION,
} from '../constants/types';
import { AuthInstance, url } from "../../helper/api_url";
import axios from 'axios';
// {{NewClone}}/api/courses/fetch_sub_topic/1
// {{NewClone}}/api/courses/fetch_lecture_by_id/25
// {{NewClone}}/api/courses/fetch_lecture_by_st/83
export const fetchTopic = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${url}/api/courses/fetch_topics`)
			.then((res) => {
				// console.log({ res });
				dispatch({
					type: FETCH_TOPIC_SUCCESS,
					payload: res.data
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });
				dispatch({
					type: FETCH_TOPIC_FAIL
				});
				resolve(false);
			});
	});
};

export const fetchSubtopic = (topic_id, sub_name = null) => (dispatch) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${url}/api/courses/fetch_sub_topic/${topic_id}`)
			.then((res) => {
				// console.log({ res });
				dispatch({
					type: FETCH_SUBTOPIC_SUCCESS,
					payload: { data: res.data, sub_name }
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });
				dispatch({
					type: FETCH_SUBTOPIC_FAIL
				});
				resolve(false);
			});
	});
};

export const fetchLectureList = (videolist) => (dispatch) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${url}/api/courses/fetch_lecture_by_st/${videolist}`)
			.then((res) => {
				// console.log({res});
				dispatch({
					type: FETCH_LECTURE_LIST_SUCCESS,
					payload: res.data
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });
				dispatch({
					type: FETCH_LECTURE_LIST_FAIL
				});
				resolve(false);
			});
	});
};

export const fetchLecture = (lid) => (dispatch) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${url}/api/courses/fetch_lecture_by_id/${lid}`)
			.then((res) => {
				// console.log(res);

				dispatch({
					type: FETCH_LECTURE_SUCCESS,
					payload: res.data.data
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });
				dispatch({
					type: FETCH_LECTURE_FAIL
				});
				resolve(false);
			});
	});
};


export const askquestions = (body, token) => (dispatch) => {
	// let header = {
	//     headers: {
	//         Authorization: `Token ${token}`
	//     }
	// };
	// console.log(header,"aaaa")
	return new Promise((resolve, reject) => {
		AuthInstance
			.post(`${url}/api/courses/ask_lecture_questions`, body)
			.then((res) => {
				// console.log(res);

				dispatch({
					type: ASK_QUESTION,
					payload: ""
				});
				resolve(true);
			})
			.catch((err) => {
				console.log({ err });
				// dispatch({
				// 	type: FETCH_LECTURE_FAIL
				// });
				resolve(false);
			});
	});
};

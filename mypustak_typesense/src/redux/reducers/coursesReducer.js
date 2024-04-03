// courseReducer.js
import {
	FETCH_TOPIC_SUCCESS,
	FETCH_TOPIC_FAIL,
	FETCH_SUBTOPIC_SUCCESS,
	FETCH_SUBTOPIC_FAIL,
	FETCH_LECTURE_LIST_SUCCESS,
	FETCH_LECTURE_LIST_FAIL,
	FETCH_LECTURE_SUCCESS,
	FETCH_LECTURE_FAIL
} from '../constants/types';

const initalState = {
	topicList: null,
	subTopicList: null,
	lectureList: null,
	lectureVideo: null,
	MathsubTopicList: '',
	PhysicssubTopicList: '',
	ChemistrysubTopicList: ''
};

export default function getCourses (state = initalState, action) {
	switch (action.type) {
		case FETCH_TOPIC_SUCCESS:
			return {
				...state,
				topicList: action.payload
			};
		case FETCH_SUBTOPIC_SUCCESS:
			if (action.payload.sub_name == 'math') {
				return {
					...state,
					MathsubTopicList: action.payload.data
				};
			} else if (action.payload.sub_name == 'physics') {
				return {
					...state,
					PhysicssubTopicList: action.payload.data
				};
			} else if (action.payload.sub_name == 'chemistry') {
				return {
					...state,
					ChemistrysubTopicList: action.payload.data
				};
			} else {
				return {
					...state,
					subTopicList: action.payload.data
				};
			}
		case FETCH_LECTURE_LIST_SUCCESS:
			return {
				...state,
				lectureList: action.payload
			};
		case FETCH_LECTURE_SUCCESS:
			return {
				...state,
				lectureVideo: action.payload
			};
		default:
			return state;
	}
}

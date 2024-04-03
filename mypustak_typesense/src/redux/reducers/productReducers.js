// import React, { Component } from 'react'
// import { LOGIN,SIGNUP } from "../action/types";
import { REVIEW_PRODUCT } from '../constants/types';
const initialState = {
    review_by_book: [],
};

export default function productReducer (state = initialState, action) {
    switch (action.type) {
        case REVIEW_PRODUCT:
            console.log(action.payload.data,"reducer productReducer");
            return {
                ...state,
                review_by_book:action.payload.data,
            }
        default:
            return state;
    }
}

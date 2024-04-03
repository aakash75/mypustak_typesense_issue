import {
    GETBOOKSUGGESTIONBYPAGE,GETBOOKSUGGESTIONBYPAGELENGTH
} from '../constants/types'

const initialState = {
    SuggestionData:[],
    SuggestionDataLength:[]
}

export default function productsuggestionreducer (state=initialState,action){
    switch(action.type){
        case GETBOOKSUGGESTIONBYPAGE:
            console.log(action.payload.data)
            return{
                ...state,
                SuggestionData:action.payload.data,
            }
        case GETBOOKSUGGESTIONBYPAGELENGTH:
            console.log(action.payload.data)
            return{
                ...state,
                SuggestionDataLength:action.payload.data,
            }
        default:
            return state;
    }
}

import { GETOFFERS, GETOFFERSHOME } from '../constants/types'
const initialState = {
    offers: [],
    offerhomepage: {},
    emptySate: "Empty"
}
export default function offerpageReducer(state = initialState, action) {
    switch (action.type) {
        case GETOFFERS:
            let offerhm = {}
            // {action.payload.filter(n => n.is_homepage==1)?
            // console.log(action.payload.filter(n => n.is_homepage==1), "offerslisted"):null
            // action.payload.filter(is_homepage)
            // action.payload.map((n)=>{
            //     console.log(n.is_homepage, "HOMEPAGECHECK")
            //     const offerhm = action.payload.filter(n.is_homepage==0)
            //     console.log(offerhm, "ishome")
            //   })
            console.log(action.payload,"payloadpayload");
            if (action.payload.filter(n => n.is_homepage == 1)[0]) {
                offerhm = action.payload.filter(n => n.is_homepage == 1)[0]
            }
            return {
                ...state,
                offers: [...state.offers, action.payload],
                offerhomepage: offerhm,
            }
        case GETOFFERSHOME:
            let offerhms = {}
            // {action.payload.filter(n => n.is_homepage==1)?
            // console.log(action.payload.filter(n => n.is_homepage==1), "offerslisted"):null
            // action.payload.filter(is_homepage)
            // action.payload.map((n)=>{
            //     console.log(n.is_homepage, "HOMEPAGECHECK")
            //     const offerhm = action.payload.filter(n.is_homepage==0)
            //     console.log(offerhm, "ishome")
            //   })
            console.log(action.payload,"payloadpayload");
            if (action.payload.filter(n => n.is_homepage == 1)[0]) {
                offerhms = action.payload.filter(n => n.is_homepage == 1)[0]
            }
            return {
                ...state,
                offerhomepage: offerhms,
            }
        default:
            return state;
    }
}
import { SEO_GET_DATA, ENTERSEODATA, SUBMITSEODATA } from "../constants/types";

const initialState = {
  seodata: {},
  metaTitle: "",
  metaDesc: "",
};

export default function getSeodata (state = initialState, action) {
  switch (action.type) {
    case SEO_GET_DATA:
      return {
        ...state,
        seodata: action.payload,
      };

    case ENTERSEODATA:
      console.log(action.payload.data, "akash1");
      return {
        ...state,
        metaTitle: action.payload.data.titletag,
        metaDesc: action.payload.data.metadesc,
      };

    case SUBMITSEODATA:
      console.log(action.payload, "test");
      return {
        ...state,
      };
    default:
      // alert("hiiiii")
      return state;
  }
}

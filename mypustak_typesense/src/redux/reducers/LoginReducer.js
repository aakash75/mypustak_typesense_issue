import { LOGIN_TOGGLE } from "../constants/types"

const initialState = {
  signuptoggle: false,
  loginOtpToggle: false,
  forgotpwdToggle: false,
}

export default function getLoginData (state = initialState, action) {
  switch (action.type) {
    case LOGIN_TOGGLE:
      return {
        ...state,
        signuptoggle: !this.state.signuptoggle,
      }

    default:
      return state
  }
}

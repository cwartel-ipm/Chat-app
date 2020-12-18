import actionTypes from "./actionTypes";

const initialState = {
  connected: false,
  sendingMessage: false,
  ws: null,
  messages: [],
  jack: "",
  sam: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONNECTED:
      return { ...state, connected: true, ws: action.payload };
    case actionTypes.SEND_MESSAGE:
      return { ...state, sendingMessage: true, jack: "", sam: "" };
    case actionTypes.ON_MESSAGE:
      if (state.messages.length > 0) {
        return { ...state, messages: [...state.messages, action.payload] };
      } else {
        return { ...state, messages: action.payload };
      }
    case actionTypes.MESSAGE_TEXT_CHANGE:
      return { ...state, [action.payload.user]: action.payload.text };
    default:
      return state;
  }
};

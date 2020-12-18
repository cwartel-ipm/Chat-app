import actionTypes from "./actionTypes";

export const onConnect = ws => {
  return {
    type: actionTypes.CONNECTED,
    payload: ws
  };
};

export const sendMessage = message => {
  return (dispath, getState) => {
    const ws = getState().ws;

    ws.send(JSON.stringify(message));
    dispath({ type: actionTypes.SEND_MESSAGE });
  };
};

export const recievedMessage = message => {
  return {
    type: actionTypes.ON_MESSAGE,
    payload: JSON.parse(message)
  };
};

export const messageTextChange = (user, text) => {
  return {
    type: actionTypes.MESSAGE_TEXT_CHANGE,
    payload: { text, user }
  };
};

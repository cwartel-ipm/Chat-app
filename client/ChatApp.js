import React from "react";
import "./style.css";
import { hot } from "react-hot-loader/root";
import MessageList from "./MessageList";
import { connect } from "react-redux";
import { sendMessage, messageTextChange } from "./state/actions";

const ChatApp = ({
  connected,
  sendMessage,
  messages,
  text,
  user,
  onTextChange
}) => {
  return (
    <div className="root">
      <div className="app-header">
        <div>Text Chat App </div>
        <i>{user} is online</i>
      </div>

      <MessageList messages={messages} />

      <div className="chat-input">
        <input
          name={user}
          value={text}
          onChange={onTextChange}
          onKeyPress={e => {
            e.key === "Enter" && sendMessage(text, new Date());
          }}
        />
        <button
          onClick={() => sendMessage(text, new Date())}
          disabled={!connected}
        >
          send
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    connected: state.connected,
    messages: state.messages,
    text: state[ownProps.user]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: (text, time) =>
      dispatch(sendMessage({ user: ownProps.user, text, time })),
    onTextChange: e =>
      dispatch(messageTextChange(ownProps.user, e.target.value))
  };
};

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatApp)
);

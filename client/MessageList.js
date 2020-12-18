import React from "react";
import Message from "./Message";
import './style.css'
class MessageList extends React.Component {

  componentDidUpdate(){
    const node = this.refs.scroller 
    node.scrollTop = node.scrollHeight
  }
  render() {
    const { messages } = this.props;
    return (
      <div className="message-list" ref="scroller" style={{ marginBottom: 5 }}>
        {messages &&
          messages.map((message, i, array) => {
            if (message.user === "sam") {
              return (
                <div key={i}>
                  <div style={{ display: "flex" }}>
                    {message.user}:
                    <Message
                      bgColor="#ffab91"
                      justifyContent="flex-start"
                      message={message.text}
                      time={message.time}
                      key={i}
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Message
                      bgColor="#a5d6a7"
                      justifyContent="flex-end"
                      message={message.text}
                      time={message.time}
                      key={i}
                    />
                    : {message.user}
                  </div>
                </div>
              );
            }
          })}
      </div>
    );
  }
}

export default MessageList;

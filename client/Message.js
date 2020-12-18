import React from "react";

const Message = ({ message, time, bgColor, justifyContent }) => {
  return (
    <div
      className="message"
      style={{ backgroundColor: bgColor, display: "flex", justifyContent }}
    >
      <div>{message}</div>
      <div className="time">{time}</div>
    </div>
  );
};

export default Message;

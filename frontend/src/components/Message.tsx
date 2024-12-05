import React from "react";
import { message } from "../types/schema";
import "./Message.css";

type MessageProps = {
  message: message;
};
export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="MessageContainer">
      <img className="icon" src="https://via.placeholder.com/45" alt="user" />
      <div className="MessageDetails">
        <div className="MessageHeader">
          <div className="user">{message.user_name}</div>
          <div className="createTime">{message.CreatedAt}</div>
        </div>
        <div className="MessageContent">{message.content}</div>
      </div>
    </div>
  );
};

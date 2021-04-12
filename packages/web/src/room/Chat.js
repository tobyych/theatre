import React, { Component } from "react";
import socketClient from "../apis/socketClient";

export class Chat extends Component {
  messagesEndRef = React.createRef();

  state = { messages: [] };

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount = () => {
    socketClient.on("chat message", (msg) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, msg],
      }));
    });
    this.scrollToBottom();
  };

  componentDidUpdate = () => {
    this.scrollToBottom();
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent whole html refresh
    if (this.refs.messageField.value !== "" && this.isOpen(socketClient)) {
      socketClient.emit("chat message", this.refs.messageField.value);
    }
    this.refs.messageField.value = "";
  };

  renderMessages = () => {
    return this.state.messages.map((message, index) => (
      <li key={index}>{message}</li>
    ));
  };

  isOpen(ws) {
    return ws.readyState === ws.OPEN;
  }

  render() {
    return (
      <div className="chat-window">
        <div className="content">
          <strong>Chat</strong>
        </div>
        <div className="ui segment message-list">
          <ul className="messages">
            {this.renderMessages()}
            <div
              style={{ float: "left", clear: "both" }}
              ref={this.messagesEndRef}
            />
          </ul>
        </div>
        <div className="segment">
          <form onSubmit={this.handleSubmit} className="form">
            <input className="field" type="text" ref="messageField" />
            <button className="ui button">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;

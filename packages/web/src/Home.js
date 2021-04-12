import React, { Component } from "react";
import socketClient from "./apis/socketClient";

import { Button, InputGroup, Input, InputGroupAddon } from "reactstrap";

import { Link } from "react-router-dom";

import "./Home.css";

class Home extends Component {
  constructor() {
    super()
    this.state = {
      roomToken: "",
      randomToken: "",
    };
  }

  createRoom = () => {
    const randomToken = Math.random().toString(16).substr(2, 5)
    this.setState({ randomToken: `${randomToken}` });
  };

  onChange = (e) => {
    this.setState({ roomToken: e.target.value });
  };

  setRoomToken = () => {
    sessionStorage.setItem("roomToken", this.state.roomToken);
    socketClient.emit("joinRoom", this.state.roomToken);
  };

  render() {
    return (
      <div className="home-container">
        <Button onClick={this.createRoom} className="button">
          Create a room
        </Button>
        <p>{this.state.randomToken}</p>
        <InputGroup className="input-grp">
          <Input
            placeholder="Enter a room token"
            value={this.state.roomToken}
            onChange={this.onChange}
          />
          <InputGroupAddon addonType="append">
            <Link
              onClick={this.setRoomToken}
              type="button"
              className="btn btn-primary"
              to={{
                pathname: "/room",
                // roomToken: this.state.roomToken,
              }}
            >
              Go to room
            </Link>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default Home;

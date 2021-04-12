import React, { Component } from "react";
import socket from "../apis/socketClient";
import { Button, ButtonGroup } from "reactstrap";

// import "./VideoControl.css";

class VideoControl extends Component {
  sendPlayVideoSignal = () => {
    socket.emit("videoControlRequest", sessionStorage.getItem("roomToken"), 1);
  };

  sendPauseVideoSignal = () => {
    socket.emit("videoControlRequest", sessionStorage.getItem("roomToken"), 0);
  }

  componentDidMount = () => {
    socket.on("videoControl", (signal) => {
      if (signal === 0) {
        this.props.player.pauseVideo();
      } else if (signal === 1) {
        this.props.player.playVideo();
      }
    })
  }

  render() {
    return (
      <ButtonGroup>
        <Button onClick={this.sendPlayVideoSignal}>Play</Button>
        <Button onClick={this.sendPauseVideoSignal}>Stop</Button>
      </ButtonGroup>
    );
  }
}

export default VideoControl;

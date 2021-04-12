import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import Chat from "./Chat";
import VideoPlayer from "./VideoPlayer";
import VideoPlaylist from "./VideoPlaylist";

import "./Room.css";

export class Room extends Component {
  state = { roomToken: "", currentVideoId: "" };

  componentDidMount() {
    // this.setState({ roomToken: this.props.location.roomToken });
    if (sessionStorage.getItem("roomToken")) {
      this.setState({ roomToken: sessionStorage.getItem("roomToken") });
    } else {
      const { history } = this.props;
      history.push("/");
    }
  }

  setVideoId = (videoId) => {
    this.setState({ currentVideoId: videoId });
  };

  render() {
    return (
      <div className="room-container">
        <div className="player">
          <VideoPlayer videoId={this.state.currentVideoId} />
        </div>
        <div className="playlist">
          <VideoPlaylist setVideoId={this.setVideoId} />
        </div>
        <div className="chat">
          <Chat />
        </div>
      </div>
    );
  }
}

export default withRouter(Room);

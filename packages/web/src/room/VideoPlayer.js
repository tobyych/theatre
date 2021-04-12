import React, { Component, Fragment } from "react";

import VideoControl from "./VideoControl";
import socket from "../apis/socketClient";

import Youtube from "react-youtube";
import "./VideoPlayer.css";


class VideoPlayer extends Component {
  state = {
    player: null,
    videoId: ''
  };

  onReady = (e) => {
    this.setState({
      player: e.target,
    });
  };

  componentDidMount = () => {
    socket.on('changeVideo', (videoId) => {
      this.setState({ videoId: videoId })
    })
  }

  render() {
    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        controls: 0,
        cc_load_policy: 0,
        enablejsapi: 1,
        modestbranding: 1,
        iv_load_policy: 3,
        playsinline: 0,
        rel: 0,
      },
    };
    return (
      <Fragment>
        <div className="video-wrapper">
          <Youtube
            className="video"
            videoId={this.state.videoId}
            opts={opts}
            onReady={this.onReady}
          />
        </div>
        <VideoControl roomToken={this.props.roomToken} className="video-control" player={this.state.player} />
      </Fragment>
    );
  }
}

export default VideoPlayer;

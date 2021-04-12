import React, { Component } from "react";
import { ListGroup, Button } from "reactstrap";

import socket from "../apis/socketClient";

import "./VideoPlaylist.css";

export class VideoPlaylist extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      playlistInput: "",
      playlist: [],
    };
  }

  appendPlaylistItem = () => {
    socket.emit(
      "addToPlaylist",
      sessionStorage.getItem("roomToken"),
      this.state.playlistInput
    );
    this.setState({
      playlistInput: ""
    })
  };

  changeInput = (e) => {
    this.setState({ playlistInput: e.target.value });
  };

  sendChangeVideoRequest = (idx) => {
    //TODO: change the VideoPlayer's state and let it re-render
    console.log('changing video...')
    socket.emit(
      "changeVideoRequest",
      sessionStorage.getItem("roomToken"),
      this.state.playlist[idx]
    );
    // this.props.setVideoId(this.state.playlist[idx]);
  };

  listItems() {
    return this.state.playlist.map((item, idx) => {
      return (
        <li className="playlist-item" key={idx}>
          <p className="playlist-item-text">{item}</p>
          <div className="playlist-item-append">
            <Button
              className="playlist-item-button"
              onClick={() => this.sendChangeVideoRequest(idx)}
            >
              Go
            </Button>
          </div>
        </li>
      );
    });
  }

  componentDidMount() {
    this._isMounted = true;

    socket.on("addToPlaylist", (playlistItem) => {
      if (this._isMounted) {
        this.setState({
          playlist: [...this.state.playlist, playlistItem],
        });
      }
    });
  }

  // fix to <Warning: Can't perform a React state update on an unmounted component.>
  componentWillUnmount = () => {
    this._isMounted = false;
  }

  render() {
    return (
      <ListGroup>
        <li className="playlist-item">
          <input
            className="playlist-item-input"
            onChange={this.changeInput}
            value={this.state.playlistInput}
          />
          <div className="playlist-item-append">
            <Button
              className="playlist-item-button"
              onClick={this.appendPlaylistItem}
            >
              Add
            </Button>
          </div>
        </li>
        {this.listItems()}
      </ListGroup>
    );
  }
}

export default VideoPlaylist;

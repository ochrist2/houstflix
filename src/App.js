import React, { Component } from "react";
import "./App.css";
import ReactPlayer from "react-player";
const BASE_URL = "http://localhost:4200";
class App extends Component {
  state = {
    vidName: "sv-s1-e1.mp4",
    selectVideoText: "sv-s1-e1.mp4"
  };

  handleChange = event => {
    this.setState({ selectVideoText: event.target.value });
  };
  submit = () => {
    this.setState({ vidName: this.state.selectVideoText });
  };
  render() {
    const { videoName, selectVideoText } = this.state;
    const url = `${BASE_URL}/video?vidString=/${videoName}`;
    return (
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <br />
        <ReactPlayer controls={true} url={url} playing />
        <br />
        <a href={url} download>
          Download (or open in a new tab to watch)
        </a>
        <br />
        <a href={`${BASE_URL}/urls`} download>
          View URLs
        </a>
        <br />
        <input
          type="text"
          value={selectVideoText}
          onChange={this.handleChange}
        />
        <button onClick={this.submit} variant="primary">
          Change video
        </button>
      </div>
    );
  }
}

export default App;

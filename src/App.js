import React, { Component } from "react";
import "./App.css";
import ReactPlayer from "react-player";
const BASE_URL = "http://localhost:4200";
class App extends Component {
  state = {
    vidName: "sample.mp4",
    selectVideoText: "sample.mp4"
  };

  handleChange = event => {
    this.setState({ selectVideoText: event.target.value });
  };
  submit = () => {
    this.setState({ vidName: this.state.selectVideoText });
  };
  render() {
    const { vidName, selectVideoText } = this.state;
    const url = `${BASE_URL}/video?vidString=/${vidName}`;
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

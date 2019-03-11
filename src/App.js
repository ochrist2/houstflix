import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    vidName: ''
  }
  changeVid = (event) => {
    fetch('http://localhost:4200/changeVideo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newVid: this.state.vidName,

      })
    }).then(res => res.json())
    .then(json => console.log(json));
    this.forceUpdate()
    //this.setState({vidName: ''})
  }
  handleChange = (event) => {
    this.setState({ vidName: event.target.value });
  }
  render() {
    return (
      <div className="App">
      <div>
        <video  width="1280" height="720" id="videoPlayer" controls >
          <source src="http://localhost:4200/video" type="video/mp4" />
        </video>
        </div>
        <br />
        <a href="http://24.54.91.194:4200/video" download>Download</a>
        <h1>Change vid</h1>

        <form onSubmit={this.changeVid}>
          <label>
            New vid name:
    <input type="text" value={this.state.vidName} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;

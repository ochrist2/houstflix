import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactPlayer from 'react-player'
class App extends Component {
  state = {
    vidName: '/sv-s1-e1.mp4',
    value: '/sv-s1-e1.mp4'
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }
  submit = () => {
    this.setState({vidName: this.state.value})
  }
  render() {
    let url = 'http://159.203.43.108:4200/video' + '?vidString=' + this.state.vidName
    return (
      <div className="App" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
	<br/>
	<ReactPlayer controls={true} url={url} playing />
	<br />        
	<a href={url} download>Download (or open in a new tab to watch)</a>
        <br/>
	<a href='http://159.203.43.108:4200/urls' download>View URLs</a>
	<br/>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button onClick={this.submit} variant="primary">Change video</button>
      </div>
    );
  }
}

export default App;

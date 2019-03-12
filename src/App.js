import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    vidName: '/sv-s1-e1.mp4',
  }

  handleChange = (event) => {
    this.setState({ vidName: event.target.value });
  }
  render() {
    let url = 'http://159.203.43.108:4200/video' + '?vidString=' + this.state.vidName
    return (
      <div className="App">
        <a href={url} download>View Vid</a>
        <br/>
        <input type="text" value={this.state.vidName} onChange={this.handleChange} />
      </div>
    );
  }
}

export default App;

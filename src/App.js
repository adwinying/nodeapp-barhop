import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  testAjax() {
    this.asd = '';
    axios.get('//localhost:3100/api/auth/check', {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    this.testAjax();
    return (
      <div className="App container">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/HomeComponent';
import styled from 'styled-components';

import './App.css';

const Body = styled.div`
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Body className="App">
          <Home />
        </Body>
      </BrowserRouter>
    );
  }
}

export default App;

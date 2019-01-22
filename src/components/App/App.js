import React, { Component } from 'react';
import '../../main.scss';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import ScrollText from '../ScrollText/ScrollText';
import CardContainer from '../CardContainer/CardContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Navigation />
        <ScrollText />
        <CardContainer />
      </div>
    );
  }
}

export default App;

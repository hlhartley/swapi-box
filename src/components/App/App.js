import React, { Component } from 'react';
import '../../main.scss';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
// import ScrollText from '../ScrollText/ScrollText';
import CardContainer from '../CardContainer/CardContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      navFixed: false,
      initialNavPosition: 0,
      people: []
    };
  }

  componentDidMount() {
    this.fetchPeople()
    window.addEventListener('scroll', this.fixNav.bind(this))
    this.setState({initialNavPosition: 250})
  }

  fixNav() {
    if(window.scrollY >= this.state.initialNavPosition) {
        this.setState({navFixed: true})
    } else {
        this.setState({navFixed: false})
    }
  }

  fetchPeople() {
    fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(result => this.setState({people: result.results}))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navigation 
          navFixed={this.state.navFixed}
          iitialNavPosition={this.state.initialNavPosition}
          people={this.state.people}
        />
        {/* <ScrollText /> */}
        <h2 className='card-container-title'>PEOPLE:</h2>
        <CardContainer people={this.state.people}/>
      </div>
    );
  }
}

export default App;

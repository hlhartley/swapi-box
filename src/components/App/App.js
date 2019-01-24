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
      people: [],
      planets: [],
      vehicles: [],
      selected: ''
    };
  }

  componentDidMount() {
    this.fetchPeople()
    this.fetchPlanets()
    this.fetchVehicles()
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
    let peopleArray = []
    for(let i=1; i < 10; i++) {
      fetch(`https://swapi.co/api/people/?page=${i}`)
      .then(response => response.json())
      .then(people => this.fetchHomeworld(people.results))
      .then(peopleWithHometowns => peopleArray.push(...peopleWithHometowns))
      .catch(error => console.log(error))
    }
    this.setState({people: peopleArray})
  }

  fetchHomeworld(people) {
    const unresolvedPromises = people.map((member) => {
      return fetch(member.homeworld)
      .then(response => response.json())
      .then(homeworld => ({ name: member.name, homeworld: homeworld.name, population: homeworld.population }))
    })
    return Promise.all(unresolvedPromises)
  }

  fetchPlanets() {
    fetch('https://swapi.co/api/planets/')
      .then(response => response.json())
      .then(result => this.setState({planets: result.results}))
      .catch(error => console.log(error))
  }

  fetchVehicles() {
    fetch('https://swapi.co/api/vehicles/')
      .then(response => response.json())
      .then(result => this.setState({vehicles: result.results}))
      .catch(error => console.log(error))
  }

  receiveSelected = (selectedButton) => {
    this.setState({ selected: selectedButton })
  }

  returnCards = () => {
    if(this.state.selected === 'people') {
      return this.state.people       
    } else {
      return []
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navigation 
          navFixed={this.state.navFixed}
          iitialNavPosition={this.state.initialNavPosition}
          people={this.state.people}
          receiveSelected={this.receiveSelected}
          // fetchPeople={this.fetchPeople}
          // fetchPlanets={this.fetchPlanets}
          // fetchVehicles={this.fetchVehicles}
        />
        {/* <ScrollText /> */}
        <h2 className='card-container-title'>PEOPLE:</h2>
        <CardContainer category={this.returnCards()}/>
      </div>
    );
  }
}

export default App;

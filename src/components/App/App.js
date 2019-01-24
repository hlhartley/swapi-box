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
      selected: 'people'
    };
  }

  async componentDidMount() {
    await this.fetchPeople()
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

  async fetchPeople() {
    let peopleArray = []
    for(let i=1; i < 10; i++) {
      const url = `https://swapi.co/api/people/?page=${i}`
      const response = await fetch(url)
      const people = await response.json()
      const peopleWithHometowns = await this.fetchHomeworld(people.results)
      await peopleArray.push(...peopleWithHometowns)
    }
    this.setState({people: peopleArray})
  }

  fetchHomeworld(people) {
    return Promise.all(people.map(async (member) => {
      const response = await fetch(member.homeworld)
      const homeworld = await response.json()
      return { 
        name: member.name, 
        homeworld: homeworld.name, 
        population: homeworld.population 
      }
    }))
    // const unresolvedPromises = people.map((member) => {
    //   return fetch(member.homeworld)
    //   .then(response => response.json())
    //   .then(homeworld => ({ name: member.name, homeworld: homeworld.name, population: homeworld.population }))
    // })
    // return Promise.all(unresolvedPromises)
  }

  fetchSpecies() {

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
      return this.state[this.state.selected] || []          
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
        <h2 className='card-container-title'>{this.state.selected.toUpperCase()}</h2>
        <CardContainer category={this.returnCards()}/>
      </div>
    );
  }
}

export default App;

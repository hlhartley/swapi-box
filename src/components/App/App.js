import React, { Component } from 'react';
import '../../main.scss';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import ScrollText from '../ScrollText/ScrollText';
import CardContainer from '../CardContainer/CardContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      navFixed: false,
      initialNavPosition: 0,
      film: [],
      people: [],
      // peopleNameLookup: {},
      planets: [],
      vehicles: [],
      selected: ''
    };
  }

  async componentDidMount() {
    await this.fetchFilms()
    await this.fetchPeople()
    await this.fetchPlanets()
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

  // TAKE THIS AWAY IF YOU WANT (decorating each person object with an ID could save you multiple fetch calls later on)
  // For example, when you are trying to get a planet's residents you could:

  // 1. Use the planet.residents array of URLs like an array of IDs with the same function below
  // 2. Now you can lookup those people from the list of people you already have from this fetchPeople call (instead of making fetch calls for each for each residentURL)
  // 3. You could speed up this lookup even more by generating a people 'hash' or object instead of a people array:

      // peopleHash = {
      //   1: { Person object} // or whatever data you need to display, maybe just the person's name?
      //   2: { Person object}
      //   3: { Person object}
      // }

      // SIDE NOTE: when you look at efficiency of algorithms you want to consider TIME and SPACE (memory usage)
      // Looking things up in a hash/object is much faster than searching through an array, but by making this hash of {IDs => people objects},
      // we do have to use more memory on the client's computer.

  // 4. You could then get the planet's residents with something like planet.residents.map(resident => peopleHash[this.extractID(resident)])


  async fetchFilms() {
    const url = `https://swapi.co/api/films/1/`
    const response = await fetch(url)
    const result = await response.json()
    const film = ({title: result.title, scrollText: result.opening_crawl, episode: result.episode_id})
    this.setState({film})
  }

  extractIdFrom(url) {
    return url.split('/').slice(-2, -1)[0];
  }

  async fetchPeople() {
    const peopleArray = [];
    const peopleNameLookup = {};
    for(let i=1; i < 10; i++) {
      const url = `https://swapi.co/api/people/?page=${i}`
      const response = await fetch(url)
      const people = await response.json()
      const peopleWithIds = people.results.map(person => {
        person.id = this.extractIdFrom(person.url);
        // peopleNameLookup[person.id] = person.name;
        return person;
      })
      const peopleWithHometowns = await this.fetchHomeworld(peopleWithIds)
      const peopleWithSpecies = await this.fetchSpecies(peopleWithHometowns)
      peopleArray.push(...peopleWithSpecies)
    }
    this.setState({people: peopleArray});
    // this.setState({peopleNameLookup: peopleNameLookup});
  }

  fetchHomeworld(people) {
    // return Promise.all(people.map(async (member) => {
    //   const response = await fetch(member.homeworld)
    //   const homeworld = await response.json()
    //   return { 
    //     name: member.name, 
    //     homeworld: homeworld.name, 
    //     population: homeworld.population 
    //   }
    // }))
    const unresolvedPromises = people.map((member) => {
      return fetch(member.homeworld)
      .then(response => response.json())
      .then(homeworld => ({ id: member.id, name: member.name, homeworld: homeworld.name, population: homeworld.population, species: member.species[0] }))
    })
    return Promise.all(unresolvedPromises)
  }

  fetchSpecies(people) {
    const unresolvedPromises = people.map((member) => {
      if(member.species) {
        return fetch(member.species)
        .then(response => response.json())
        .then(species => ({ id: member.id, name: member.name, homeworld: member.homeworld, population: member.population, species: species.name, language: species.language }))
      } else {
        return ({ id: member.id, name: member.name, homeworld: member.homeworld, population: member.population, species: 'N/A', language: 'N/A' })
      }
    })
    return Promise.all(unresolvedPromises)
  }

  async fetchPlanets() {
    const url = 'https://swapi.co/api/planets/'
    const response = await fetch(url)
    const planets = await response.json()

    let planetsWithResidentNames = planets.results.map((planet) => {
      planet.residents = planet.residents.map((resident) => {
        return this.extractIdFrom(resident);
        // return this.state.peopleNameLookup[this.extractIdFrom(resident)];
      })
      .map((residentId) => {
        const matchingPerson = this.state.people.find(person => person.id === residentId)
        return matchingPerson ? matchingPerson.name : 'unknown';
      })
      return planet;
    })

    this.setState({planets: planetsWithResidentNames})
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

  renderScreen = () => {
    if(this.state.selected === '') {
      return <ScrollText film={this.state.film}/>
    } else {
      return <CardContainer category={this.returnCards()} selected={this.state.selected}/>
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
        {this.renderScreen()}
      </div>
    );
  }
}

export default App;

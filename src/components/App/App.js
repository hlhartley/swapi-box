import React, { Component } from 'react';
import '../../main.scss';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import ScrollText from '../ScrollText/ScrollText';
import CardContainer from '../CardContainer/CardContainer';
import { fetchService } from  '../../Helpers/requests.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      navFixed: false,
      initialNavPosition: 0,
      films: {},
      people: [],
      planets: [],
      vehicles: [],
      selected: 'films',
      favorites: JSON.parse(localStorage.getItem('favorites')) || [],
      errorMessage: '',
    };
  }

  async componentDidMount() {
    await this.fetchFilms()
    await this.fetchPeople()
    window.addEventListener('scroll', this.fixNav.bind(this))
    this.setState({initialNavPosition: 250})
  }

  async makeFetchCall(selected) {
    // bug with fetchService -- page not loading, inconsistent
    const result = await fetchService({ path: selected })
    if(selected === 'vehicles') {
      this.fetchVehicles(result)
    } else if (selected === 'planets') {
      this.fetchPlanets(result)
    }
  }

  async fetchFilms() {
    try {
      const result = await fetchService({ path: 'films/1' })
      const films = ({
        title: result.title,
        scrollText: result.opening_crawl,
        episode: result.episode_id,
        release: result.release_date,
      })
      this.setState({ films })
    } catch(error) {
      this.setState({errorMessage: error.message })
    }
  }

  extractIdFrom(url) {
    return url.split('/').slice(-2, -1)[0];
  }

  async fetchPeople() {
    const peopleArray = [];
    for(let i=1; i < 3; i++) {
      const result = await fetchService({ path: `people/?page=${i}` })
      const peopleWithIds = result.results.map(person => {
        person.id = this.extractIdFrom(person.url);
        person.type = 'person'
        return person;
      })
      const peopleWithHometowns = await this.fetchHomeworld(peopleWithIds)
      const peopleWithSpecies = await this.fetchSpecies(peopleWithHometowns)
      peopleArray.push(...peopleWithSpecies)
    }
    this.setState({people: peopleArray})
  }

  fetchHomeworld(people) {
    return Promise.all(people.map(async (member) => {
      const result = await fetchService({ url: member.homeworld });
      return { 
        id: member.id,
        type: member.type,
        species: member.species[0], 
        name: member.name, 
        homeworld: result.name, 
        population: result.population 
      }
    }))
  }

  fetchSpecies(people) {
    const unresolvedPromises = people.map(async (member) => {
      if(member.species) {
        const result = await fetchService({ url: member.species });
        return {
          id: member.id, 
          type: member.type, 
          name: member.name, 
          homeworld: member.homeworld, 
          population: member.population, 
          species: result.name, 
          language: result.language
        }
      } else {
        return ({ 
          id: member.id, 
          type: member.type, 
          name: member.name, 
          homeworld: member.homeworld, 
          population: member.population, 
          species: 'n/a', 
          language: 'n/a' 
        })
      }
    })
    return Promise.all(unresolvedPromises)
  }

  async fetchPlanets(result) {
    let planetsWithResidentNames = result.results.map((planet) => {
      planet.residents = planet.residents
      .map((resident) => {
        return this.extractIdFrom(resident);
      })
      .map((residentId) => {
        const matchingPerson = this.state.people.find(person => person.id === residentId)
        return matchingPerson ? matchingPerson.name : 'unknown';
      })
      planet.type = 'planet'
      return planet;
    })
    this.setState({planets: planetsWithResidentNames})
  }

  async fetchVehicles(result) {
    const vehicles = await result.results.map(vehicle => {
      vehicle.type = 'vehicle'
      return vehicle;
    })
    this.setState({vehicles: vehicles})
  }

  fixNav() {
    if(window.scrollY >= this.state.initialNavPosition) {
        this.setState({navFixed: true})
    } else {
        this.setState({navFixed: false})
    }
  }

  receiveSelected = (selectedButton) => {
    console.log('recieve selected called', this.state.selected)
    this.setState({ selected: selectedButton }, 
      () => {
        // For some reason, this.state.selected was coming back undefined in certain cases (eg: switching tabs quickly)
        // Was this some sort of race condition issue?? This is the reason for the check below on 158
        console.log("setstate callback", this.state.selected)
        if (this.state.selected) { 
          if (this.state.selected !== 'films' && (this.state.selected !== 'favorites' && !this.state[this.state.selected].length)) {
            this.makeFetchCall(this.state.selected)
          }
        }
      })
    }

  returnCards = () => {
      return this.state[this.state.selected] || [];       
  }

  renderScreen = () => {
    if(this.state.selected === 'films') {
      return <ScrollText films={this.state.films}/>
    } else {
      return <CardContainer 
        category={this.returnCards()} 
        selected={this.state.selected} 
        clickFavoriteButton={this.clickFavoriteButton}
        favorites={this.state.favorites}
      />
    }
  }

  clickFavoriteButton = (object) => {
    if (!this.state.favorites.find(favorite => favorite.name === object.name)) {
      this.setState({favorites: [...this.state.favorites, object]}, () => localStorage.setItem('favorites', JSON.stringify([...this.state.favorites, object])))
    } else {
      const filteredFavorites = this.state.favorites.filter(favorite => favorite.name !== object.name);
      this.setState({favorites: filteredFavorites}, () => localStorage.setItem('favorites', JSON.stringify(filteredFavorites)))
    }
  }
  
  
  render() {
    return (
      <div className="App">
        <Header />
        <Navigation 
          navFixed={this.state.navFixed}
          initialNavPosition={this.state.initialNavPosition}
          people={this.state.people}
          planets={this.state.planets}
          vehicles={this.state.vehicles}
          receiveSelected={this.receiveSelected}
          favorites={this.state.favorites}
        />
        {this.renderScreen()}
      </div>
    );
  }
}

export default App;

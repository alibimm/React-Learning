import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({robots: users}));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });
    if (filteredRobots.length === 0) {
      return <h1>Loading</h1>;
    }
    return (
      <div className='tc'>
        <h1 className='f1'>Robofriends</h1>
        <SearchBox onChange={this.onSearchChange} />
        <CardList robots={filteredRobots}/>
      </div>
    );
  }
}

export default App;
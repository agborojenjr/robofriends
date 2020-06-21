import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/cardlist';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/scroll';
import './App.css';

import { setSearchField } from '../action';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField
	}
}


const mapDispatchToProps = (dispatch) => {
	return { 
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({ robots:users }))
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })

	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = robots.filter(robot =>{
		return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		}) 
		
		if (!robots.length) {
			return <h1>Loading</h1>
		} else {
			return (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 
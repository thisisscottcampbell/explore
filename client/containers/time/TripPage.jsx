import React, { useState, useEffect, Component } from 'react';

import {
	Flex,
	Button,
	Box,
	Grid,
	GridItem,
	VStack,
	StackDivider,
	Text,
	Heading,
} from '@chakra-ui/react';

// import "@babel/polyfill";
import NavBar from '../../components/NavBar';
import TripPageIntroText from '../../components/tripPageIntroText';
import Footer from '../../components/Footer';
import FindActivitesDrawer from '../../components/FindActivitesDrawer';
import SavedActivitiesDrawer from '../../components/SavedActivitiesDrawer';

class TripPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			trip: {
				activities: [],
			},
			tripId: props.location.state.param,
			lat: null,
			lng: null,
			member_id: props.computedMatch.params.member_id,
		};
		// this.handleSearchedActivities = this.handleSearchedActivities.bind(this);
		this.addActivityHandler = this.addActivityHandler.bind(this);
		this.deleteActivityHandler = this.deleteActivityHandler.bind(this);
	}

	componentDidMount() {
		// const { tripId } = this.props.match.params
		// console.log('Get url params', tripId);
		console.log(this.state.trip);
		// console.log(this.props)

		fetch(`/api/trips/${this.state.member_id}/${this.state.tripId}`)
			.then((result) => result.json())
			.then((result) => {
				console.log(result);
				const { trip } = result;
				trip.activities = [];
				this.setState({ trip });
			})
			.catch((err) => console.log(err));
	}

	// handleSearchedActivities = (destination, category) => {
	// 	fetch('/api/yelp/', {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			categories: category,
	// 			location: destination,
	// 		}),
	// 	})
	// 		.then((response) => {
	// 			console.log(body);
	// 			if (response.status === 200) {
	// 				return response.json();
	// 			}

	// 			return response.json().then((err) => {
	// 				throw err;
	// 			});
	// 		})
	// 		.then((result) => {
	// 			console.log('result', result);
	// 			let trip = { ...this.state.trip };
	// 			let newActivites = result.result;
	// 			trip.searchedActivities = newActivites;
	// 			this.setState({ trip });
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error);
	// 		});
	// };
	addActivityHandler = (
		event,
		name,
		location,
		image_url,
		url,
		latitude,
		longitude,
		reviewCount,
		rating
	) => {
		event.preventDefault();

		fetch(`/api/activity/${this.state.tripId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				location,
				imageUrl: image_url,
				url,
				reviewCount,
				rating,
				latitude,
				longitude,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				let trip = { ...this.state.trip };
				const activity = data.activity;
				activity.imageUrl = data.activity.image_url;
				trip.activities.push(data.activity);
				this.setState({ trip });
				console.log(data.activity);

				// const trip = [...this.state.trip];
				// trip.activities.push(data.activity);
				// this.props.handleNewTrip(trips);
			})
			.catch((error) => console.log(error));
	};
	deleteActivityHandler = (event, id) => {
		fetch(`/api/activity/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => {
				if (res.status === 200) return res.json();
				return res.json().then((data) => {
					throw data;
				});
			})
			.then((data) => {
				const activities = this.state.trip.activities.filter(
					(el) => el.id !== id
				);
				this.setState({ trip: { ...this.state.trip, activities } });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	render() {
		return (
			<>
				<NavBar />
				<Grid templateColumns="repeat(3, 1fr)">
					<GridItem colSpan={3}>
						<TripPageIntroText trip={this.state.trip} />
					</GridItem>
					<GridItem colSpan={3}>
						<GridItem colSpan={3} m={30} padding={10}>
							<FindActivitesDrawer
								addActivityHandler={this.addActivityHandler}
								trip={this.state.trip}
							/>
							<GridItem colSpan={3}>
								<SavedActivitiesDrawer
									deleteActivityHandler={this.deleteActivityHandler}
									currentActivities={this.state.trip.activities}
								/>
							</GridItem>
						</GridItem>
						{this.state.lng && this.state.lat && (
							<Map
								trip={this.state.trip}
								lat={this.state.lat}
								lng={this.state.lng}
							/>
						)}
					</GridItem>
				</Grid>
				<Footer />
				{/* <Button onClick={this.handleShowState}>Show State</Button> */}
			</>
		);
	}
}

export default TripPage;

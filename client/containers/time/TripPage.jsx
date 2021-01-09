import React, { useState, useEffect, Component } from 'react';

import {
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Heading,
	Flex,
	Button,
	FormControl,
	Stack,
	Text,
	Box,
	Grid,
	GridItem,
	Select,
	Input,
} from '@chakra-ui/react';

import NavBar from '../../components/NavBar';
import TripPageIntroText from '../../components/tripPageIntroText';
import Footer from '../../components/Footer';
import FindActivitesDrawer from '../../components/FindActivitesDrawer';
import SavedActivitiesDrawer from '../../components/SavedActivitiesDrawer';
import Map from '../../components/Map';

class TripPage extends Component {
	//should just be able to simply declare state = {...}
	constructor(props) {
		super(props);

		this.state = {
			trip: {
				activities: [],
			},
			tripId: props.location.state.param,
			lat: null,
			lng: null,
		};
		this.addActivityHandler = this.addActivityHandler.bind(this);
		this.deleteActivityHandler = this.deleteActivityHandler.bind(this);
	}

	componentDidMount() {
		// const { tripId } = this.props.match.params
		// console.log('Get url params', tripId);
		console.log('INPUTLOCATION IN TRIP PAGE:', this.props.inputLocation);
		//grab the lat and lon ... set that value
		fetch(`/api/trips/${this.state.tripId}`)
			.then((result) => result.json())
			.then((result) => {
				const newTrip = {};
				newTrip.location = result.trip.destination;
				newTrip.tripName = result.trip.title;
				newTrip.place_id = result.trip.place_id;
				newTrip.tripStartFrontEnd = result.trip.start_date;
				newTrip.tripEndFrontEnd = result.trip.end_date;
				newTrip.locationphotos = result.trip.locationphotos;
				newTrip.datesKnown = result.trip.dates_known;
				newTrip.id = result.trip.id;
				newTrip.activities = result.activities;

				this.setState({ trip: newTrip });
			})
			.catch((err) => console.log('i am tripId error', err));

		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.inputLocation}&key=AIzaSyD1C3IhMoufeZNQ0FEC2b5B2wyr6gVBMfo`
		)
			.then((result) => result.json())
			.then((result) => {
				const lat = result.results[0].geometry.location.lat;
				const lng = result.results[0].geometry.location.lng;
				this.setState({ lat: lat });
				this.setState({ lng: lng });
			})
			.catch((err) => console.log('i am lat/lng error', err));
	}
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

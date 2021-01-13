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
import Map from '../../components/Map';

const TripPage = (props) => {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		trip: {
	// 			activities: [],
	// 		},
	// 		inputLocation: '',
	// 		tripId: props.location.state.param,
	// 		lat: null,
	// 		lng: null,
	// 		member_id: props.computedMatch.params.member_id,
	// 	};
	// 	// this.handleSearchedActivities = this.handleSearchedActivities.bind(this);
	// 	this.addActivityHandler = this.addActivityHandler.bind(this);
	// 	this.deleteActivityHandler = this.deleteActivityHandler.bind(this);
	// }

	const [trip, setTrip] = useState({});
	const [inputLocation, setInputLocation] = useState('');
	const [tripId, setTripId] = useState(props.location.state.param);
	const [lat, setLat] = useState('');
	const [lng, setLng] = useState('');
	const [member_id, setMember_id] = useState(
		props.computedMatch.params.member_id
	);
	const [geocodeFetch, setGeocodeFetch] = useState(false);

	useEffect(() => {
		fetch(`/api/trips/${member_id}/${tripId}`)
			.then((result) => result.json())
			.then((result) => {
				// console.log('This is the result from TripPage: ', result);
				console.log('I AM RESULT', result);
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

				// this.setState({ trip: newTrip });

				console.log('New Trip Location', newTrip.location);
				setTrip(newTrip);
				setInputLocation(newTrip.location);
				setGeocodeFetch(true);
				console.log(trip);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (!geocodeFetch) return;
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${inputLocation}&key=AIzaSyD1C3IhMoufeZNQ0FEC2b5B2wyr6gVBMfo`
		)
			.then((result) => result.json())
			.then((result) => {
				console.log('From the geocode fetch: ', result);
				const lat = result.results[0].geometry.location.lat;
				const lng = result.results[0].geometry.location.lng;
				setLat(lat);
				setLng(lng);
				geocodeFetch(false);
			})
			.catch((err) => console.log('i am lat/lng error', err));
	}, [geocodeFetch]);

	const addActivityHandler = (
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

		fetch(`/api/activity/${tripId}`, {
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
				const trip = { trip };
				const activity = data.activity;
				activity.imageUrl = data.activity.image_url;
				trip.activities.push(data.activity);
				setTrip(trip);
				//console.log(data.activity);

				// const trip = [...this.state.trip];
				// trip.activities.push(data.activity);
				// this.props.handleNewTrip(trips);
			})
			.catch((error) => console.log(error));
	};
	const deleteActivityHandler = (event, id) => {
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
				const activities = trip.activities.filter((el) => el.id !== id);
				setTrip({ ...this.state.trip, activities });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<NavBar />
			<Grid templateColumns="repeat(3, 1fr)">
				<GridItem colSpan={3}>
					<TripPageIntroText trip={trip} />
				</GridItem>
				<GridItem colSpan={3}>
					<GridItem colSpan={3} m={30} padding={10}>
						{/* <FindActivitesDrawer
							addActivityHandler={addActivityHandler}
							trip={trip}
						/> */}
						<GridItem colSpan={3}>
							{/* <SavedActivitiesDrawer
								deleteActivityHandler={deleteActivityHandler}
								currentActivities={trip.activities}
							/> */}
						</GridItem>
					</GridItem>

					{lat && lng && <Map trip={trip} lat={lat} lng={lng} />}
				</GridItem>
			</Grid>
			<Footer />
			{/* <Button onClick={this.handleShowState}>Show State</Button> */}
		</>
	);
};

export default TripPage;

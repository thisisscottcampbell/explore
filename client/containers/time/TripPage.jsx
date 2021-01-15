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

				setTrip(newTrip);
				setInputLocation(newTrip.location);
				setGeocodeFetch(true);
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
				setTrip({ ...trip, activities: [...trip.activities, data.activity] });
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
				const newActivities = trip.activities.filter((el) => el.id !== id);
				setTrip({ ...trip, activities: newActivities });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<NavBar />
			<Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(1, 1fr)">
				<GridItem colSpan={1} m={15}>
					{trip.location && (
						<FindActivitesDrawer
							addActivityHandler={addActivityHandler}
							trip={trip}
						/>
					)}
				</GridItem>
				<GridItem colSpan={1} m={2.5}>
					{trip && <TripPageIntroText trip={trip} />}
				</GridItem>

				<GridItem colSpan={1} m={15}>
					{trip.activities && (
						<SavedActivitiesDrawer
							deleteActivityHandler={deleteActivityHandler}
							trip={trip}
						/>
					)}
				</GridItem>

				{lat && lng && (
					<GridItem colSpan={3} rowSpan={1}>
						<Map trip={trip} lat={lat} lng={lng} />
					</GridItem>
				)}
			</Grid>
			<Footer />
			{/* <Button onClick={this.handleShowState}>Show State</Button> */}
		</>
	);
};

export default TripPage;

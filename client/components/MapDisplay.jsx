import React, { useState, useEffect, useRef } from 'react';
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	InfoWindow,
	Marker,
} from 'react-google-maps';
import { useControllableState } from '@chakra-ui/react';
// import mapStyles from './mapStyles';

const MapDisplay = ({ lat, lng, trip }) => {
	console.log('MapDisplay props:', lat, lng, trip);

	const [selectedActivity, setSelectedActivity] = useState(null);
	const [activities, setActivities] = useState(trip.activities);
	const [infoPosition, setInfoPosition] = useState(null);
	//const [displaySearch, setSearch] = useState(false);

	useEffect(() => {
		//make request
		//setParks(parksData);
	}, []);

	const DisplayActivities = activities.map((activity) => (
		<Marker
			title={activity.title}
			rating={activity.rating}
			key={activity.id}
			position={{
				lat: Number(activity.latitude),
				lng: Number(activity.longitude),
			}}
			onClick={() => {
				setSelectedActivity(activity);
				setInfoPosition({
					latitude: Number(activity.latitude),
					longitude: Number(activity.longitude),
				});
			}}
			// icon={{
			// 	// url: '../assets/images-2.png',
			// 	scaledSize: new window.google.maps.Size(40, 40),
			// // }}
		/>
	));

	return (
		<>
			<GoogleMap
				defaultZoom={11.5}
				defaultCenter={{ lat: lat, lng: lng }}
				//defaultOptions={{ styles: mapStyles }}
			>
				{DisplayActivities}
				{/* {displaySearch} */}
				{selectedActivity && infoPosition && (
					<InfoWindow
						position={{
							lat: infoPosition.latitude,
							lng: infoPosition.longitude,
						}}
						onCloseClick={() => {
							setSelectedActivity(null);
							setInfoPosition(null);
						}}
					>
						<div>
							<p>Stars: {selectedActivity.rating}</p>
							<h3>Name: {selectedActivity.title}</h3>
							<img src={selectedActivity.image_url} height={100} width={100} />
							{/* <button>Save Park</button> */}
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
			<div>
				{/* {!displaySearch && (
					<button onClick={() => setDisplay(true)}>Show My Activites</button>
				)}
				{displaySearch && (
					<button onClick={() => setDisplay(false)}>Show Search Results</button>
				)} */}
			</div>
		</>
	);
};

export const WrappedMap = withScriptjs(withGoogleMap(MapDisplay));

// props.activty === {
//     id,
//     image_url,
//     title,
//     url,
//     latitude,
//     longitude,
//     rating,
//     review_count,
//     location,
//     trip_id,
//   }

import React from 'react';

import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
	width: '100vw',
	height: '100vh',
};

export default function MapComponent(props) {
	// console.log('props in MapComponent: ', props);
	console.log('LAT AND LNG!!!', props.lat, props.lng);
	// const {
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
	//   } = props.activity;
	// console.log('activities: ', props.trip.activities);
	// console.log('latitude: ', props.trip.activities[0].latitude);
	// console.log('longitude: ', props.trip.activities[0].longitude);
	const center = {
		lat: props.lat,
		lng: props.lng,
	};
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyD1C3IhMoufeZNQ0FEC2b5B2wyr6gVBMfo',
		libraries,
	});

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';

	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
			></GoogleMap>
		</div>
	);
}
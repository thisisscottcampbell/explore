import React from 'react';
import { WrappedMap } from './MapDisplay';

import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';

// const libraries = ['places'];
// const mapContainerStyle = {
// 	width: '100vw',
// 	height: '100vh',
// };

const Map = ({ lat, lng, trip }) => {
	// console.log('props in MapComponent: ', props);
	console.log('LAT AND LNG!!!', lat, lng, trip);

	const googleMapsApiKey = 'AIzaSyD1C3IhMoufeZNQ0FEC2b5B2wyr6gVBMfo';

	return (
		<div style={{ width: '99%', height: '80vh' }}>
			<WrappedMap
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleMapsApiKey}`}
				loadingElement={<div style={{ height: '100%' }} />}
				containerElement={<div style={{ height: '100%' }} />}
				mapElement={<div style={{ height: '100%', width: '100%' }} />}
				lat={lat}
				lng={lng}
				trip={trip}
			></WrappedMap>
		</div>
	);
};

export default Map;

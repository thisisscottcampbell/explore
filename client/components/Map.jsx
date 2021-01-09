import React from 'react';
import { WrappedMap } from './MapDisplay';

const Map = ({ lat, lng, trip }) => {
	//hide this...
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

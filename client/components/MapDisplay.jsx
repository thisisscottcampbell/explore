import React, { useState, useEffect, useRef } from 'react';
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	InfoWindow,
	Marker,
} from 'react-google-maps';
import parksData from './data/park_list';
import mapStyles from './mapStyles';

const MapDisplay = ({ lat, lng, trip }) => {
	const [selectedPark, setPark] = useState(null);
	const [activities, setActivities] = useState(trip.activities);
	const [displayParks, setDisplay] = useState(false);

	useEffect(() => {
		//make request
		setParks(parksData);
	}, []);

	const DisplayParks = savedParks.current.map((park) => (
		<Marker
			name={park.Name}
			details={park.details}
			key={park.PARK_ID}
			position={{
				lat: park.coordinates[1],
				lng: park.coordinates[0],
			}}
			onClick={() => {
				setPark(park);
			}}
			icon={{
				url: '../assets/images-2.png',
				scaledSize: new window.google.maps.Size(40, 40),
			}}
		/>
	));

	return (
		<>
			<GoogleMap
				defaultZoom={10}
				//the city itself
				defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
				defaultOptions={{ styles: mapStyles }}
			>
				{displayParks && DisplayParks}
				{!displayParks &&
					parksList &&
					parksList.parks.map((park) => (
						<Marker
							name={park.Name}
							details={park.details}
							key={park.PARK_ID}
							position={{
								lat: park.coordinates[1],
								lng: park.coordinates[0],
							}}
							onClick={() => {
								setPark(park);
							}}
							icon={{
								url: '../assets/images-2.png',
								scaledSize: new window.google.maps.Size(40, 40),
							}}
						/>
					))}
				{selectedPark && (
					<InfoWindow
						position={{
							lat: selectedPark.coordinates[1],
							lng: selectedPark.coordinates[0],
						}}
						onCloseClick={() => setPark(null)}
					>
						<div>
							<p>{selectedPark.details}</p>
							<h3>{selectedPark.Name}</h3>
							<button
								onClick={() => {
									savedParks.current.push(selectedPark);
									console.log(savedParks.current);
								}}
							>
								Save Park
							</button>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
			<div>
				{!displayParks && (
					<button onClick={() => setDisplay(true)}>Show Saved Parks</button>
				)}
				{displayParks && (
					<button onClick={() => setDisplay(false)}>Show All Parks</button>
				)}
			</div>
		</>
	);
};

export const WrappedMap = withScriptjs(withGoogleMap(MapDisplay));

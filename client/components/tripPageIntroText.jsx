import React from 'react';

import { Text, Grid, GridItem, Flex } from '@chakra-ui/react';

import MyActivities from '../components/MyActivities';

const TripPageIntroText = ({ trip }) => {
	console.log(trip);

	return (
		<Grid>
			<GridItem>
				<Text align="center" color="gray.900" fontSize="5xl">
					{trip.tripName}
				</Text>
			</GridItem>
		</Grid>
	);
};

export default TripPageIntroText;

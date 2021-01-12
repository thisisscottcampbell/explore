import React from 'react';

import { Text, Grid, GridItem, Flex } from '@chakra-ui/react';

import MyActivities from '../components/MyActivities';

const TripPageIntroText = (props) => {
	let rowNumber;
	props.trip.start_date
		? (rowNumber = 'repeat(3, 1fr)')
		: (rowNumber = 'repeat(2, 1fr)');

	return (
		<>
			<Grid templateColumns="repeat(3, 1fr)" templateRows={rowNumber}>
				<GridItem rowSpan={1} colSpan={3}>
					<Text align="center" color="gray.900" mt="5%" fontSize="5xl">
						{props.trip.title}
					</Text>
				</GridItem>
				<GridItem rowSpan={1} colSpan={3}>
					<Text align="center" color="gray.700" fontSize="3xl">
						{props.trip.destination}
					</Text>
				</GridItem>
				{props.trip.start_date && (
					<>
						<GridItem align="right" rowSpan={1} colSpan={1}>
							<Text fontSize="xl">
								{new Date(props.trip.start_date).toLocaleDateString()}
							</Text>
						</GridItem>
						<GridItem align="center" rowSpan={1} colSpan={1}>
							<Text fontSize="xl">-</Text>
						</GridItem>

						<GridItem align="left" rowSpan={1} colSpan={1}>
							<Text fontSize="xl">
								{new Date(props.trip.end_date).toLocaleDateString()}
							</Text>
						</GridItem>
					</>
				)}
			</Grid>
		</>
	);
};

export default TripPageIntroText;

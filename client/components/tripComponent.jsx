import React, { Component } from 'react';

import {
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	Button,
	FormControl,
	Image,
	Text,
	Box,
	Grid,
	GridItem,
	VStack,
	StackDivider,
	Container,
	Heading,
} from '@chakra-ui/react';

const TripPlanned = ({
	destination,
	start_date,
	end_date,
	place_id,
	dates_known,
	member_id,
	deleteTripHandler,
	title,
}) => {
	// const { destination, start_date, end_date, place_id, dates_known, member_id } = trip;
	// const max = props.trips.locationPhotos.length;
	// const randPhoto = Math.floor(Math.random() * max) + 1;
	// console.log(randPhoto);
	// const photo = props.trips.locationPhotos[randPhoto];
	// console.log(photo, props.trips.location, props.trips.tripStart, props.trips.tripEnd);
	const photo = null;

	console.log(
		'TRIPPLANNED',
		'destination',
		destination,
		'start_date',
		start_date,
		end_date,
		place_id,
		dates_known,
		member_id,
		title
	);
	return (
		<>
				<Grid
					h="350px"
					w='300px'
					templateRows="repeat(4, 1fr)"
					templateColumns="repeat(1, 1fr)"
				>
					<GridItem rowSpan={1} colSpan={1}>
						<Text textAlign="center" color="gray.800" fontSize="2xl" pt={3} color='teal.500' fontWeight='bold'>
							{title}
						</Text>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1} py={1}>
						<Box>
							<Flex justifyContent="center">
								<Image
									boxSize="200px"
									src={photo}
									fallbackSrc="https://www.ishn.com/ext/resources/900x550/airplane-plane-flight-900.jpg?height=635&t=1583412590&width=1200"
								/>
							</Flex>
						</Box>
					</GridItem>
					<GridItem rowSpan={1} colSpan={1}>
						<Text textAlign='center' fontSize="lg" color="gray.800">
							Destination: {destination}
						</Text>
					</GridItem>
					{(dates_known === 'day' || dates_known === 'month') && (
					<>
					<GridItem rowSpan={1} colSpan={1}>
						<Text textAlign='center' fontSize="lg" color="gray.800">
							Trip Date:
						</Text>
						<Text textAlign='center' fontSize="lg" color="gray.800">
							{new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}
						</Text>
					</GridItem>	
					</>
					)}
				</Grid>
		</>
	);
};

export default TripPlanned;

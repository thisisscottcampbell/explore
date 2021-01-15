import React, { useState } from 'react';

import {
	Button,
	Input,
	Flex,
	Box,
	Heading,
	Select,
	FormControl,
} from '@chakra-ui/react';

const ActivitySearch = ({ findActivities, findActivitiesByTerm, trip }) => {
	const [searchField, setSearchField] = useState('');
	const [searchByTerm, setSearchTerm] = useState('');

	const handleSelectedSearch = (event) => {
		console.log(
			'handleSelectedSearchByCategory value is: ',
			event.target.value
		);
		setSearchField(event.target.value);
	};

	const handleSelectedSearchByTerm = (event) => {
		console.log('handleSelectedSearchByTerm value is: ', event.target.value);
		setSearchTerm(event.target.value);
	};

	const handleSearch = (event) => {
		event.preventDefault();
		findActivities(trip.location, searchField);
	};

	const handleSearchByTerm = (event) => {
		console.log('handleSearchByTerm event triggered');
		event.preventDefault();
		findActivitiesByTerm(trip.location, searchByTerm);
	};

	return (
		<>
			<Heading align="center" color="gray.900" fontSize="2xl" mb="8px">
				Find Activities
			</Heading>

			<Heading m={2} fontSize="2xl">
				Search By Term
			</Heading>
			<FormControl>
				<Input
					m={2}
					placeholder="What are you looking for"
					value={searchByTerm}
					onChange={handleSelectedSearchByTerm}
				/>

				<Button
					onClick={handleSearchByTerm}
					colorScheme="blue"
					size="lg"
					marginLeft={2}
				>
					Search
				</Button>

				<Select
					m={2}
					placeHolder="Search Activities"
					value={searchField}
					onChange={handleSelectedSearch}
					background="white"
				>
					<option value="arts">Arts</option>
					<option value="active">Currently Open</option>
					<option value="food">Food</option>
					<option value="hotels">Hotels</option>
					<option value="parks">Parks</option>
					<option value="shopping">Shopping</option>
					<option value="tours">Tours</option>
				</Select>

				<Button
					onClick={handleSearch}
					colorScheme="blue"
					size="lg"
					marginLeft={2}
				>
					Search
				</Button>
			</FormControl>
		</>
	);
};

export default ActivitySearch;

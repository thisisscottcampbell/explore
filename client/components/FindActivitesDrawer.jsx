import React, { useState } from 'react';
import ActivitySearch from './ActivitySearch';
import ActivityList from '../containers/time/Activities/ActivityList';
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
	FormLabel,
	Stack,
	Text,
	Box,
	Grid,
	GridItem,
	Select,
	Input,
} from '@chakra-ui/react';
import { RiAddCircleFill } from 'react-icons/ri';

const FindActivitiesDrawer = ({
	trip,
	handleSearchedActivities,
	addActivityHandler,
}) => {
	//[inputOrSelect, setSearch] = [];

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	const [searchResults, setSearchResults] = useState([]);

	const findActivities = (destination, category) => {
		fetch('/api/yelp/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				categories: category,
				location: destination,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				}

				return response.json().then((err) => {
					throw err;
				});
			})
			.then((result) => {
				console.log('result', result);
				setSearchResults([...result.result]);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<>
			<Flex justifyContent="center">
				<Button
					ref={btnRef}
					onClick={onOpen}
					leftIcon={<RiAddCircleFill />}
					colorScheme="teal"
					size="md"
					style={{ marginBottom: '10px' }}
				>
					Find Stuff To Do
				</Button>
			</Flex>

			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				finalFocusRef={btnRef}
				size="md"
			>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader background="teal.50" fontSize="2xl">
							Add Your Adventure
						</DrawerHeader>
						<DrawerBody>
							<FormControl>
								<FormLabel>Know What You're Looking For?</FormLabel>
								<input />
								<ActivitySearch trip={trip} findActivities={findActivities} />
							</FormControl>
							<GridItem colSpan={3}>
								{searchResults && (
									<ActivityList
										addActivityHandler={addActivityHandler}
										searchResults={searchResults}
									/>
								)}
							</GridItem>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
};

export default FindActivitiesDrawer;

import React from 'react';
import SavedActivities from './SavedActivities';

import {
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Heading,
	Flex,
	Button,
	FormControl,
	Stack,
	Text,
	Box,
	Grid,
	GridItem,
	Select,
	Input,
} from '@chakra-ui/react';

const SavedActivitiesDrawer = ({
	deleteActivityHandler,
	currentActivities,
}) => {
	return (
		<div>
			<Heading align="center" color="gray.900" mt="1%" fontSize="2xl">
				My Activities
			</Heading>

			<Grid templateColumns="repeat(4, 1fr)" m={30} padding={2} gap={6}>
				{currentActivities.map((activity) => (
					<SavedActivities
						deleteActivityHandler={deleteActivityHandler}
						activity={activity}
					/>
				))}
			</Grid>
		</div>
	);
};

export default SavedActivitiesDrawer;

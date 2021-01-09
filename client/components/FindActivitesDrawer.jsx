import React from 'react';
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

	return (
		<>
			<Flex justifyContent="center">
				<Button
					ref={btnRef}
					onClick={onOpen}
					leftIcon={<RiAddCircleFill />}
					colorScheme="teal"
					size="md"
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
								<ActivitySearch
									trip={trip}
									handleSearchedActivities={handleSearchedActivities}
								/>
							</FormControl>
							<GridItem colSpan={3}>
								<ActivityList
									addActivityHandler={addActivityHandler}
									trip={trip}
								/>
							</GridItem>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	);
};

export default FindActivitiesDrawer;

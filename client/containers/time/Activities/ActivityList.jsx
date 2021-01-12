/* eslint-disable max-len */
import React from 'react';
import EachActivity from './EachActivity';
import Activity from '../../../components/activityComponent';

import {
	Flex,
	Button,
	Box,
	Grid,
	GridItem,
	Text,
	StackDivider,
	Heading,
} from '@chakra-ui/react';
const ActivityList = ({ searchResults, addActivityHandler }) => {
	return (
		<>
			<Box boxSize="m">
				<Grid templateColumns="repeat(4, 1fr)" m={30} padding={10} gap={6}>
					{searchResults.map((activity) => (
						<GridItem colSpan={1}>
							<Activity
								addActivityHandler={addActivityHandler}
								activity={activity}
							/>
						</GridItem>
					))}
				</Grid>
			</Box>
		</>
	);
};

export default ActivityList;

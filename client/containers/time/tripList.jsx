import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  createStandaloneToast,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawterOverlay,
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
import TripPlanned from '../../components/tripComponent';

const TripListContainer = ({ trips, deleteTripHandler, message }) => {
  const toast = createStandaloneToast();

  console.log('TRIPS FROM TRIPLIST: ', trips);
  return (
    <>
      <Box
        p={5}
        shadow='md'
        borderWidth='1px'
        flex='1'
        borderRadius='md'
        mt={10}
        mb={10}
        mr={(0, 50, 200)}
        ml={(0, 50, 200)}
      >
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch'
        >
          {trips.map(
            ({
              id,
              title,
              destination,
              start_date,
              end_date,
              place_id,
              dates_known,
              member_id,
            }) => (
              <>
                <Grid key={`trip_grid_${id}`}>
                  <GridItem>
                    <Text textAlign='center' color='gray.800' fontSize='2xl'>
                      {title} Created By: {member_id}
                    </Text>
                  </GridItem>
                  <GridItem>
                    <TripPlanned
                      key={`trip_${id}`}
                      destination={destination}
                      start_date={start_date}
                      end_date={end_date}
                      place_id={place_id}
                      dates_known={dates_known}
                      member_id={member_id}
                    />
                  </GridItem>
                  <GridItem>
                    <Flex justify='center'>
                      {/* <Button m={2} colorScheme="blue" onClick = {()=>console.log('clicked')}> */}
                      <Link
                        to={{
                          pathname: `/time/trip/${member_id}/${id}`,
                          state: { param: `${id}` },
                        }}
                      >
                        <Button type='button' m={2} colorScheme='blue'>
                          Explore {destination}
                        </Button>
                      </Link>
                      {/* </Button>  */}

                      <Button
                        m={2}
                        id={id}
                        type='button'
                        colorScheme='red'
                        onClick={deleteTripHandler}
                      >
                        Delete trip
                      </Button>
                    </Flex>
                  </GridItem>
                </Grid>
              </>
            )
          )}
        </VStack>
      </Box>
    </>
  );
};

export default TripListContainer;

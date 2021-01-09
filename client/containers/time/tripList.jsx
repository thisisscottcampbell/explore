import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../useAuth';
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
  const auth = useAuth();
  console.log(auth.user)
  const userId = auth.user.Id;
  const toast = createStandaloneToast();

  return (
    <>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        mt={10}
        mb={10}
        mr={(0, 50, 200)}
        ml={(0, 50, 200)}
      >
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {trips.map(
            ({
              id,
              tripName,
              location,
              tripStartFrontEnd,
              tripEndFrontEnd,
              place_id,
              datesKnown,
              creator_id,
            }) => (
              <>
                <Grid key={`trip_grid_${id}`}>
                  <GridItem>
                    <Text textAlign="center" color="gray.800" fontSize="2xl">
                      {tripName} Created By: { creator_id }
                    </Text>
                  </GridItem>
                  <GridItem>
                    <TripPlanned
                      key={`trip_${id}`}
                      trip={{
                        location,
                        tripStartFrontEnd,
                        tripEndFrontEnd,
                        place_id,
                        datesKnown,
                        creator_id,
                      }}
                    />
                  </GridItem>
                  <GridItem>
                    <Flex justify="center">
                      {/* <Button m={2} colorScheme="blue" onClick = {()=>console.log('clicked')}> */}
                      <Link
                        to={{
                          pathname: `/time/trip/${creator_id}/${id}`,
                          state: { param: `${id}` },
                        }}
                      >
                        <Button type="button" m={2} colorScheme="blue">
                          Explore {location} 
                        </Button>
                      </Link>
                      {/* </Button>  */}

                      <Button
                        m={2}
                        id={id}
                        type="button"
                        colorScheme="red"
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

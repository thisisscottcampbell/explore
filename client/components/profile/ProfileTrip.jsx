import React from 'react';

import {
  Box,
  Button,
  Text,
  Image,
  Grid,
  GridItem,
  Link,
  Badge,
  Center,
  Flex,
  Tabs,
  TabList,
} from '@chakra-ui/react';

const ProfileTrip = ({
  title,
  destination,
  start_date,
  end_date,
  locationphotos,
  member_name,
}) => {
  return (
    <>
      <Box>
        <Grid templateRows='repeat(4, 1fr)'>
          <GridItem>{title}</GridItem>
          <GridItem>{destination}</GridItem>
          <GridItem>
            {start_date} - {end_date}
          </GridItem>
          <GridItem>{locationphotos}</GridItem>
        </Grid>
        {/* <Grid templateColumns='repeat(3, 1fr)'>
          {menuItems.map((el, index) => {
            return (
              <GridItem colSpan={1} m={2} key={el + index}>
                <Button
                  colorScheme='teal'
                  variant='outline'
                  onClick={() => setCurrentTab(el)}
                >
                  <Text fontSize={{ base: '0px', md: '18px', lg: '20px' }}>
                    {el}
                  </Text>
                </Button>
              </GridItem>
            );
          })}
        </Grid> */}
      </Box>
    </>
  );
};
export default ProfileTrip;

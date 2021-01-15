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
        <Grid>
          <GridItem>{title}</GridItem>
          <GridItem>{destination}</GridItem>
          <GridItem>
            {new Date(start_date).toLocaleDateString()} -{' '}
            {new Date(end_date).toLocaleDateString()}
          </GridItem>
          <Flex align='center'>
            <Image
              //   boxSize='200px'
              src={locationphotos[0]}
              fallbackSrc='https://www.ishn.com/ext/resources/900x550/airplane-plane-flight-900.jpg?height=635&t=1583412590&width=1200'
            />
          </Flex>
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

import React, { useState } from 'react';

// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { useHistory, Link } from 'react-router-dom';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Image,
  Button,
  Text,
  Grid,
  GridItem,
  Icon,
} from '@chakra-ui/react';

// import { RiAddCircleFill } from 'react-icons/ri';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { GrDirections } from 'react-icons/gr';
// import { IconContext } from 'react-icons';
import { useAuth } from '../useAuth';

// stateless functional component

export default function NavBar() {
  const auth = useAuth();
  const history = useHistory();

  const handleSignOut = () => {
    fetch('/api/member/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status === 200) {
          auth.signOutFunc(() => history.push('/'));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const userid = 1;
  const goToProfile = () => {
    history.push(`/time/profile/${userid}`);
  };

  return (
    <>
      <Box border='1px' borderColor='teal.100' background='teal.50'>
        <Grid templateColumns='repeat(2, 1fr)'>
          <GridItem colSpan={2} m={2}>
            <Link to={{ pathname: '/time/home' }}>
              <Button colorScheme='teal' variant='outline'>
                <Icon as={GrDirections} w={8} h={8} />
                <Text fontSize={{ base: '0px', md: '18px', lg: '20px' }}>
                  TIME
                </Text>
              </Button>
            </Link>
          </GridItem>

          <GridItem m={2}>
            <Button onClick={goToProfile} colorScheme='none' color="teal.500">
              <Text fontSize={{ base: '0px', md: '18px', lg: '20px' }}>
                {auth.user.userName}
              </Text>
            </Button>
          </GridItem>

          <GridItem colStart={20} m={2}>
            <Button
              // m={2}
              // fontSize={{ base: '15px', md: '18px', lg: '20px' }}
              // align="right"
              // iconSpacing={0}
              colorScheme="none"
              // variant='solid'
              // borderRadius="full"
              // boxShadow='base'
              // verticalAlign="right"
              color="gray.400"
             
              onClick={handleSignOut}
            >
              Log Out
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

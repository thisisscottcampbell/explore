import React, {useState} from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileHeader from '../../components/profile/ProfileHeader';

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
} from '@chakra-ui/react';

const trips = {
  'Inspiration': ["1"],
  'Upcoming': ["2"],
  'Past': ["3"]
}

const Profile = ({ allTrips }) => {

  const [currentTab, setCurrentTab] = useState(0);

  console.log('curr tab', currentTab);

  const menuItems = Object.keys(trips);

  return (
    <>
      <NavBar />
      <Box>
        <ProfileHeader currentTab={currentTab} setCurrentTab={setCurrentTab} menuItems={menuItems}/>
        <>
        {
          menuItems.map((el, index) => {
            const style = {display: index === currentTab ? 'block': 'none'}
            return (
          
              <p style={style}>{el}</p>
            )
          })
        }</>
      </Box>
      <Footer />
    </>
  );
};
export default Profile;

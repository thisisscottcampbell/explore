import React from 'react';
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
} from "@chakra-ui/react";

const Profile = ({ allTrips }) => {
  return (
    <>
      <NavBar />
      <Box>
        <ProfileHeader />
      </Box>
      <Footer />
    </>
  );
};
export default Profile;

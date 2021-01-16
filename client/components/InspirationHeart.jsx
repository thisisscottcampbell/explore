import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import {
  Icon,
  Box,
  Button,
  Text,
  Image,
  Grid,
  GridItem,
  Badge,
  Center,
  Flex,
  Tabs,
  TabList,
} from '@chakra-ui/react';

const InspirationHeart = ({ favorite, tripId, handleFavorite }) => {
  return (
    <>
      <Grid>
        <Button onClick={() => handleFavorite(tripId)} w="100%" bg="none">
          {favorite ? (
            <Icon as={AiFillHeart} color='pink.500'/>
          ) : (
            <Icon as={AiOutlineHeart} color='teal.500' />
          )}
        </Button>
      </Grid>
    </>
  );
};
export default InspirationHeart;

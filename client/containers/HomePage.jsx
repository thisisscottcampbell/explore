import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Box,
  Stack,
  Text,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import image from "../assets/images/Bridge.jpg";

const HomePage = () => {
  const background = `url(${image})`;
  return (
    <>
      <Box
        backgroundImage={background}
        backgroundRepeat="no-repeat"
        bgPosition="center bottom"
        bgSize="cover"
        py={20}
        pb={350}
      >
        <Container bg="gray.700" opacity='.8' borderRadius='25px'>
        <Stack spacing={8}>
          <Box pb={10} opacity='1'>
            <Text fontSize="4xl" m={2} color="gray.50" textAlign="center">
              Travel Itineary Made Easy
            </Text>
            <Text fontSize="lg" m={2} color="gray.50" textAlign="center">
              Plan your next discovery. 
            </Text>
            <Text fontSize="lg" m={2} color="gray.50" textAlign="center">
              Create individual trips and start searching for activities to do
              within the area.
            </Text>
            <Text textAlign="center" fontSize="lg" color="gray.50" m={2}>
              Whether you are planning on going next week or simply creating a
              dream adventure, use TIME to take the stress out of planning and
              keep the joy in traveling!
            </Text>

            <Flex justifyContent="center">
              <Stack spacing={4} direction="row" align="center" padding="4">
                <NavLink to="/signup">
                  <Button
                    border="2px"
                    borderColor="teal.500"
                    colorScheme="teal"
                    variant="solid"
                  >
                    New User
                  </Button>
                </NavLink>
                <NavLink to="/login">
                  <Button
                    border="2px"
                    colorScheme='blue'
                    background='blue.400'
                    borderColor='blue.400'
                    variant="solid"
                  >
                    Log In
                  </Button>
                </NavLink>
              </Stack>
            </Flex>
          </Box>
        </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;

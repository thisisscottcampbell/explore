import React, { useState, useEffect, Component } from "react";

import {
  Flex,
  Button,
  Box,
  Grid,
  GridItem,
  VStack,
  StackDivider,
  Text,
  Heading,
} from "@chakra-ui/react";

// import "@babel/polyfill";
import NavBar from "../../components/NavBar";
import TripPageIntroText from "../../components/tripPageIntroText";
import Footer from "../../components/Footer";
import ActivitiesList from "./Activities/ActivityList";
import ActivitySearch from "../../components/ActivitySearch";
import SavedActivities from "../../components/SavedActivities";

class TripPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip: {
        activities: [],
      },
      tripId: props.location.state.param,
      creator_id: props.computedMatch.params.creator_id,
    };
  }

  componentDidMount() {
    console.log(this.state)
    console.log(this.props)
    fetch(`/api/trips/${this.state.creator_id}/${this.state.tripId}`)
      .then((result) => result.json())
      .then((result) => {
        const newTrip = {};
        newTrip.location = result.trip.destination;
        newTrip.tripName = result.trip.title;
        newTrip.place_id = result.trip.place_id;
        newTrip.tripStartFrontEnd = result.trip.start_date;
        newTrip.tripEndFrontEnd = result.trip.end_date;
        newTrip.locationphotos = result.trip.locationphotos;
        newTrip.datesKnown = result.trip.dates_known;
        newTrip.id = result.trip.id;
        newTrip.activities = result.activities;
        newTrip.member_id = result.trip.member_id;
        newTrip.session_id = result.trip.sessionId;

        this.setState({ trip: newTrip });
      })
      .catch((err) => console.log(err));
  }

  handleSearchedActivities = (location, category) => {
    fetch("/api/yelp/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories: category,
        location: location,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        return response.json().then((err) => {
          throw err;
        });
      })
      .then((result) => {
        console.log("result", result);
        let trip = { ...this.state.trip };
        let newActivites = result.result;
        trip.searchedActivities = newActivites;
        this.setState({ trip });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  addActivityHandler = (
    event,
    name,
    location,
    image_url,
    url,
    latitude,
    longitude,
    reviewCount,
    rating
  ) => {
    event.preventDefault();

    fetch(`/api/activity/${this.state.tripId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        location,
        imageUrl: image_url,
        url,
        reviewCount,
        rating,
        latitude,
        longitude,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let trip = { ...this.state.trip };
        const activity = data.activity;
        activity.imageUrl = data.activity.image_url;
        trip.activities.push(data.activity);
        this.setState({ trip });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <>
        <NavBar />
        <Grid templateColumns="repeat(3, 1fr)">
          <GridItem colSpan={3}>
            <TripPageIntroText trip={this.state.trip} />
          </GridItem>
          <GridItem colSpan={3}>
            <Heading align="center" color="gray.900" mt="1%" fontSize="2xl">
              Saved Activities
            </Heading>
            <Grid templateColumns="repeat(4, 1fr)" m={30} padding={2} gap={6}>
              {this.state.trip.activities.map((savedActivity) => (
                <SavedActivities
                  activity={savedActivity}
                />
              ))}
            </Grid>
          </GridItem>
        </Grid>
        <Footer />
      </>
    );
  }
}

export default TripPage;

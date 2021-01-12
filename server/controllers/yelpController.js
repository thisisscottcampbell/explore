const Pool = require('../model/database.js');
const yelp = require('yelp-fusion');
const { API_KEY } = require('../config');
const client = yelp.client(API_KEY);

const yelpController = {};

yelpController.getActivities = async (req, res, next) => {
  const offset = [20, 40, 60, 80, 100];
  let completeResult = [];
  let differentSearchRequests = [];

  if (req.body.categories){
    const { categories, location } = req.body;

    for (let i = 0; i < offset.length; i++) {
      const searchRequest = {
        categories,
        location,
        offset: offset[i],
      };
  
      let uniqueSearchRequest = client.search(searchRequest);
  
      differentSearchRequests.push(uniqueSearchRequest);
    }
  
    const searchResult = await Promise.all(differentSearchRequests);
    searchResult.forEach((response) => {
      const data = response.jsonBody.businesses;
  
      data.forEach((business) => {
        let targetData = {};
  
        targetData.name = business.name;
        targetData.image_url = business.image_url;
        targetData.url = business.url;
        targetData.review_count = business.review_count;
        targetData.rating = business.rating;
        targetData.categories = business.categories;
        targetData.coordinates = business.coordinates;
        targetData.address = business.location.display_address;
  
        completeResult.push(targetData);
        // console.log('This length is: ', completeResult.length)
      });
    });
  } else {
    const { text, location } = req.body;

    const searchRequest = {
      text,
      lat: 33.858349,
      lng: -118.064789
    };

    let result = await client.autocomplete(searchRequest);

    let allResults = await client.search({
      term: result.jsonBody.terms[0].text,
      location: location,
    });

    allResults.jsonBody.businesses.forEach((business) => {
      let targetData = {};

      targetData.name = business.name;
      targetData.image_url = business.image_url;
      targetData.url = business.url;
      targetData.review_count = business.review_count;
      targetData.rating = business.rating;
      targetData.categories = business.categories;
      targetData.coordinates = business.coordinates;
      targetData.address = business.location.display_address;

      completeResult.push(targetData);
      // console.log('This length is: ', completeResult.length)
    });
  }
  
  completeResult.sort((a, b) => b.review_count - a.review_count);

  res.locals.result = completeResult;
  res.locals.message = `Successfully grabbed the data with ${res.locals.result.length} businesses`;
  return next();
};

module.exports = yelpController;

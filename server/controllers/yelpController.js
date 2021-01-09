const Pool = require('../model/database.js');
const yelp = require('yelp-fusion');
const { API_KEY } = require('../config');
const client = yelp.client(API_KEY);

const yelpController = {};

yelpController.getActivities = async (req, res, next) => {
  const offset = [20, 40, 60, 80, 100];
  let completeResult = [];
  let differentSearchRequests = [];

  if (req.body.catgories){
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
    const { text, lat, lng } = req.body;

    for (let i = 0; i < offset.length; i++) {
      const searchRequest = {
        text,
        lat,
        lng,
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
  }
  

  completeResult.sort((a, b) => b.review_count - a.review_count);

  res.locals.result = completeResult;
  res.locals.message = `Successfully grabbed the data with ${res.locals.result.length} businesses`;
  return next();
};

module.exports = yelpController;

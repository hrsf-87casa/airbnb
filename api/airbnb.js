const fetch = require('node-fetch');

const format = (listing, details) => ({
  num_guests: listing.listing.person_capacity,
  bedrooms: listing.listing.beds,
  bathrooms: listing.listing.bathrooms,
  name: listing.listing.name,
  description: details.listing.description,
  summary: details.listing.summary,
  neighborhood: listing.listing.neighborhood,
  street_address: details.listing.address,
  lat: listing.listing.lat,
  lng: listing.listing.lng,
  zip_code: details.listing.zipcode,
  city: listing.listing.city,
  state: details.listing.state,
  cancellation_policy: details.listing.cancellation_policy,
  nightly_price: details.listing.price,
  pic_url: listing.listing.picture_url,
  rating: listing.listing.star_rating || 3,
});

const search = query =>
  fetch(encodeURI(`https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&locale=en-US&currency=USD&_format=for_search_results_with_minimal_pricing&_limit=20&_offset=0&fetch_facets=true&guests=1&location=${query}&min_num_pic_urls=1&sort=1`))
    .then(resp => resp.json())
    .then(resp => resp.search_results);

const getDetails = id =>
  fetch(`https://api.airbnb.com/v2/listings/${id}?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3`).then(resp => resp.json());

module.exports = { format, search, getDetails };

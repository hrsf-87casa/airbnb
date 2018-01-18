<<<<<<< HEAD
<<<<<<< HEAD
const fetch = require('node-fetch');
=======
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GEOCODEKEY,
  Promise: Promise,
});
// it's cool that promises are native for this package
let getLatLong = (address, callback) => {
  googleMapsClient
    .geocode({ address: address })
    .asPromise()
    .then((response) => callback(response))
    .catch((err) => console.log('err', err));
};
>>>>>>> Merge conflict
=======
const fetch = require('node-fetch');
>>>>>>> Merge conflict

const getLatLong = async (address) => {
  const geoCode = await fetch(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
    process.env.GEOCODEKEY
  }`)).then(resp => resp.json());
  if (geoCode.status === 'OK') {
    return geoCode.results[0].geometry.location;
  }
  return {
    lat: 'N/A',
    lng: 'N/A',
  };
};

module.exports = {
  getLatLong,
};

const request = require('request')
const chalk = require('chalk')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZ2FyaWFyIiwiYSI6ImNsYzllOXJhNDBqYzQ0MWxoc2R1dWx3YTQifQ.SpNo4jzxSEGBx6buxk3g1g`
  sameURL = url
  //console.log(sameURL)
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('No internet connection ', undefined)
    } else if (body.features.length === 0) {
      callback('Location not found! Please try a new search', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        sameURL: url,
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode

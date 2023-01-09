const request = require('request')
const geocode = require('./geocode')
chalk = require('chalk')
function degToCompass(num) {
  var val = Math.floor(num / 22.5 + 0.5)
  var arr = [
    'North',
    'North-NE',
    'NE',
    'East-NE',
    'East',
    'East-SE',
    'SE',
    'South-SE',
    'South',
    'South-SW',
    'SW',
    'West-SW',
    'West',
    'West-NW',
    'NW',
    'North-NW',
  ]
  return arr[val % 16]
}
const forecast = (lat, long, callback) => {
  wAddress = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0838b2d2055606e59c5fc97d7c442ab1&units=imperial`
  // console.log(wAddress)
  request({ url: wAddress, json: true }, (error, { body } = {}) => {
    //console.log(userResponse)
    if (error) {
      callback('No network found ', undefined)
    } else if (body.error) {
      callback('Bad address please try again ', undefined)
    } else {
      callback(undefined, {
        Conditions: body.weather[0].description,
        Temperature: body.main.temp,
        feelslike: body.main.feels_like,
        windspeed: body.wind.speed,
        compass: body.wind.deg,
        forecast: `Conditions: ${body.weather[0].description.toUpperCase()} Temperature: ${
          body.main.temp
        }° Feelslike: ${body.main.feels_like}° Wind speed/Direction: ${
          body.wind.speed
        }Mph/${degToCompass(body.wind.deg)}`,
      })
    }
  })
}
module.exports = forecast

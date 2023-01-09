console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('#main')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')
const lat = document.querySelector('#lat')
const long = document.querySelector('#long')
const timeDate = document.querySelector('#hdte')
const send = document.querySelector('input')
let date = Date()
//= Date.now() = new Date(2012, 1, 20, 3, 12)
timeDate.textContent = date
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data)
        console.log(data.forecast)
        msgOne.textContent = data.location
        msgTwo.textContent = data.forecast
        lat.textContent = data.lat
        long.textContent = data.long
        send = data.location
      }
    })
  })
})

mapboxgl.accessToken =
  'pk.eyJ1IjoiZ2FyaWFyIiwiYSI6ImNsYzllOXJhNDBqYzQ0MWxoc2R1dWx3YTQifQ.SpNo4jzxSEGBx6buxk3g1g'
const map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/streets-v12', // Map style to use
  center: [-122.25948, 37.87221], // Starting position [lng, lat]
  zoom: 12, // Starting zoom level
})
const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
})

// Add the geocoder to the map
map.addControl(geocoder)

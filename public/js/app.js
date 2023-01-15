const weatherForm = document.querySelector('form')
const search = document.querySelector('#main')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')
const lat = document.querySelector('#lat')
const long = document.querySelector('#long')
const timeDate = document.querySelector('#hdte')
const maybe = document.nodeValue
let date = Date()

timeDate.textContent = date

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        mapboxgl.accessToken =
          'pk.eyJ1IjoiZ2FyaWFyIiwiYSI6ImNsYzllOXJhNDBqYzQ0MWxoc2R1dWx3YTQifQ.SpNo4jzxSEGBx6buxk3g1g'
        const map = new mapboxgl.Map({
          container: 'map',
          maxZoom: 13,
          minZoom: 4,
          zoom: 30,
          center: [data.long, data.lat],
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: 'mapbox://styles/mapbox/dark-v11',
        })

        msgOne.textContent = data.location
        msgTwo.textContent = data.forecast
        lat.textContent = data.lat
        long.textContent = data.long
        send1.textContent = data.location
        maybe = data.location
      }
    })
  })
})

console.log(maybe)

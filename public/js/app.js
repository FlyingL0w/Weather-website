const weatherForm = document.querySelector('form')
const search = document.querySelector('#main')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')
const lat = document.querySelector('#lat')
const long = document.querySelector('#long')
const timeDate = document.querySelector('#hdte')
const send1 = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')
const maybe = document.nodeValue
let date = Date()
//= Date.now() = new Date(2012, 1, 20, 3, 12)
timeDate.textContent = date
// const banner = new Image()
// const loading = new Image()
// const bannerElement = document.getElementById('banner') // assumes an element with id "banner" contains the banner image - you can get the element however you want.
// banner.src = '/img/'
// loading.src = '/img/load.gif'
// banner.onload = function () {
//   bannerElement.removeChild(bannerElement.lastChild)
//   bannerElement.appendChild(banner)
// }
// bannerElement.removeChild(bannerElement.lastChild)
// bannerElement.appendChild(loading)

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data.lat)
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

        map.on('load', () => {
          map.addSource('radar', {
            type: 'image',
            url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
            coordinates: [
              [-80.425, 46.437], //data.long, data.lat
              [data.long, data.lat],
              [data.long, data.lat],
              [-80.425, 37.936],
            ],
          })
          map.addLayer({
            id: 'radar-layer',
            type: 'raster',
            source: 'radar',
            paint: {
              'raster-fade-duration': 0,
            },
          })
        })
        // mapboxgl.accessToken =
        //   'pk.eyJ1IjoiZ2FyaWFyIiwiYSI6ImNsYzllOXJhNDBqYzQ0MWxoc2R1dWx3YTQifQ.SpNo4jzxSEGBx6buxk3g1g'
        // const map = new mapboxgl.Map({
        //   container: 'map',
        //   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        //   style: 'mapbox://styles/mapbox/streets-v12',
        //   center: [data.long, data.lat],
        //   zoom: 13,
        // })

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

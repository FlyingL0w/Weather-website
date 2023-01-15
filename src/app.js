const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')
const yargs = require('yargs')
const newAddress = process.argv[2]
yargs.version('1.1.0')

// Path sets
console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const root = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Set static
app.use(express.static(root))

const port = process.env.PORT || 8080

// Start call
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Check weather, use any location: City, State, or by Zip Code',
    footer: 'Created with 💛 by Gabriel Armijo',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'About this website will be here',
    footer: 'Created with 💛 by Gabriel Armijo',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Help text will be here',
    footer: 'Created with 💛 by Gabriel Armijo',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide a location',
    })
  }
  /// Geocoding
  const newAddress = req.query.address
  geocode(newAddress, (error, { lat, long, location } = {}) => {
    if (error) {
      console.log('Error', error)
      return res.send({ error })
    }

    forecast(lat, long, (error, { forecast = 'Null' } = {}) => {
      if (error) {
        console.log('Error', error)
        return res.send({ error })
      }
      console.log(lat)
      console.log(long)
      console.log(location)
      console.log(forecast)
      console.log(newAddress)
      //console.log(sameURL)

      res.send({
        location,
        forecast,
        lat,
        long,
        sameURL,
      })
    })
  })
  // End geocoding
})

app.get('/product', (req, res) => {
  res.render('product', {
    title: 'Help',
    name: 'Help text will be here',
    footer: 'Created with 💛 by Gabriel Armijo',
  })
})

app.get('/help/*', (req, res) => {
  res.render('help', {
    title: 'Article page not found',
    name: 'Content my be missing',
    footer: 'Created with 💛 by Gabriel Armijo',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page not found',
    errorMSG: 'No content to display, please check address and try again',
    name: 'Use back arrow or navibation links',
    footer: 'Created with 💛 by Gabriel Armijo',
  })
})

app.listen(port, () => {
  console.log('Server has started on port' + port)
})
yargs.parse()

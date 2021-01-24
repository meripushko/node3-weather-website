const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')

console.log()

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Simeon Meripushkoski"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Simeon Meripushkoski"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text",
        title: "Help Page",
        name: "Simeon Meripushkoski"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Prilep',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: "Help article not found!",
        name: "Simeon Meripushkoski"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: "Page not found!",
        name: "Simeon Meripushkoski"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
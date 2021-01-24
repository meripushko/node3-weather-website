const request = require('request')

const forecast = (longitute, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=451d138843ec64ff4d799fb7f32602dc&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitute) + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to reach the service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location specified!', undefined)
        } else {
            const description = body.current.weather_descriptions[0]
            const degrees = body.current.temperature
            const feelsLike = body.current.feelslike
            const observationTime = body.current.observation_time
            callback(undefined, 'Observation time is ' + observationTime + '. ' + description + '. It is currently ' + degrees + ' degrees out. It feels like ' + feelsLike + ' degrees out.')
        }
    })
}

module.exports = forecast

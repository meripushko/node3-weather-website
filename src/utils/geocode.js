const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVyaXB1c2hrbyIsImEiOiJja2s5cDBrNDkwa2d2Mm5zOW1oeWZoYWg2In0.Ke3v0zrzCL9sQ7U4zax5jg&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to reach the service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find the location specified!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
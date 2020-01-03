const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFyc2g2NiIsImEiOiJjazRwdjZqZm8wanU1M2RwMWE1dmE0eW9nIn0.dSZE_gJQhOtRrUsAc0Ttyg&limit=1'

    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find Location', undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode
const request = require("request")

forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/92f2b785f46a43ae4b3edd52de94e086/' + longitude + ',' + latitude + '?units=si'   
request({
    url,
    json: true
}, (error, {body}) => {
    if(error){
        callback('Únavle to connect to location services', undefined)
    }else if(body.error){
        callback('Unable to find the location')
    }
    else{
        callback(undefined, {
            summary: body.daily.data[0].summary,
            temprature: body.currently.temperature,
            precipProbability: body.currently.precipProbability + '%'
        })
    }
})    
    
}

module.exports = forecast
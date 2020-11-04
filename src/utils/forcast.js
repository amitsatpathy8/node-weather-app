const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bb2aa447fe67b51302331c9941585455&query='+longitude+','+latitude
    request({url , json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect the weather service!',undefined)
        } else if(body.error){
            callback('Unable to find location!',undefined)
        } else{
            callback(undefined,body.current.weather_descriptions[0]+ '. Today\'s temparature is '+body.current.temperature+'°C . And it feels like '+body.current.feelslike+'°C .\n And currently the wind speed is '+body.current.wind_speed+'km/h . Humidity of this area is '+body.current.humidity+'.')
        }
    })
}

module.exports = forecast
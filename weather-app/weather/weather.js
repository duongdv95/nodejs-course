const request = require("request");

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/8c8649b6c10c1f23e01ae4ae6aff0d37/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
            });
    } else {
        callback("Unable to fetch weather.")
    }
    });
};

module.exports = {
    getWeather
}
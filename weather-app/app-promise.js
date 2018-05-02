const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBG7A1pUKtHFg0bOHCc6yLa2RwsKO2n_Sg`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === "ZERO_RESULTS") {
        throw new Error("Unable to find that address");
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/8c8649b6c10c1f23e01ae4ae6aff0d37/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
}).catch((e) => {
    if(e.code === "ENOTFOUND") {
        console.log("Unable to connect to API servers.")
    } else {
        console.log(e.message);
    }
})
const request = require("request");
// const yargs = require("yargs");

// const geocode = require("./geocode/geocode")
// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: "address",
//             describe: "Address to fetch weather for",
//             string: true
//         }
//     })
//     .help()
//     .alias("help", "h")
//     .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if(errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });

request({
    url: "https://api.darksky.net/forecast/8c8649b6c10c1f23e01ae4ae6aff0d37/33.7636344,-117.9688322",
    json: true
}, (error, response, body) => {
    if(!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log("Unable to fetch weather.")
    }
})

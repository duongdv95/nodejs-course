// USD, CAD, 20

// http://data.fixer.io/api/latest?access_key=5fc1d093d45acf5861ac02dc6b30156e

const axios = require("axios");

// const getExchangeRate = (from, to) => {
//     return axios.get("http://data.fixer.io/api/latest?access_key=5fc1d093d45acf5861ac02dc6b30156e").then((response)=> {
//         const euro = 1/response.data.rates[from]; 
//         const rate = euro*response.data.rates[to];
//         return rate;
//     });
// };

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// };

const getExchangeRate = async (from, to) => {
    const response = await axios.get("http://data.fixer.io/api/latest?access_key=5fc1d093d45acf5861ac02dc6b30156e");
    const euro = 1/response.data.rates[from]; 
    const rate = euro*response.data.rates[to];
    return rate;
};

const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
};

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount*rate).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(", ")}`;
//     });
// };

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(", ")}`
}
convertCurrency("USD","CAD",25).then((message) => {
   console.log(message); 
});
// getExchangeRate("USD", "CAD").then((rate) => {
//     console.log(rate);
// });

// getCountries("CAD").then((countries) => {
//   console.log(countries); 
// });
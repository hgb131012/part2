import axios from "axios";
const dbURL = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAllCountries = () => {
    return axios.get(`${dbURL}/all`);
}

const showCountry = countryName => {
    return axios.get(`${dbURL}/name/${countryName}`);
}

export default { getAllCountries, showCountry }
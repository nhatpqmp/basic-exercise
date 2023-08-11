const axios = require('axios');

const apiUsers = 'https://jsonplaceholder.typicode.com/users';

async function fetchDataFromAPI(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error: ', error.message);
        return [];
    }
}

fetchDataFromAPI(apiUsers)
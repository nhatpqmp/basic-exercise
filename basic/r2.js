const axios = require('axios');
const fs = require('fs');

const apiUsers = 'https://jsonplaceholder.typicode.com/users';

async function fetchDataFromAPI(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error: ', error.message);
        return [];
    }
}

(async () => {
    try {
        const data = await fetchDataFromAPI(apiUsers);
        fs.writeFileSync('./r2.json', JSON.stringify(data, null, 2));
        console.log('Data written to r2.json');
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();
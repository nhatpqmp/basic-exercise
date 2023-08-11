const axios = require('axios');

const apiPosts = 'https://jsonplaceholder.typicode.com/posts/1';
const apiComments = 'https://jsonplaceholder.typicode.com/comments';

async function fetchDataFromAPI(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error: ', error.message);
        return [];
    }
}

async function getData(callback) {
    try {
        const postWithId1 = await fetchDataFromAPI(apiPosts);
        const comments = await fetchDataFromAPI(apiComments);

        const commentsForPost1 = comments.filter(comment => comment.postId === 1);

        const postWithComments = {
            ...postWithId1,
            comments: commentsForPost1
        };

        callback(postWithComments);
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

getData((data) => {
    console.log(data);
});

const axios = require('axios');

const apiPosts = 'https://jsonplaceholder.typicode.com/posts';
const apiComments = 'https://jsonplaceholder.typicode.com/comments';
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

async function getData(callback) {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchDataFromAPI(apiUsers),
            fetchDataFromAPI(apiPosts),
            fetchDataFromAPI(apiComments)
        ]);

        const usersCustomData = users.map(({ id, name, username, email }) => ({
            id,
            name,
            username,
            email,
            posts: posts
                .filter(post => post.userId === id)
                .map(({ id, title, body }) => ({ id, title, body })),
            comments: comments.filter(comment => comment.postId === id)
        }));
        callback(usersCustomData);
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

getData((data) => {
    const users = data.map(({ id, name, username, email, posts, comments }) => ({
        id,
        name,
        username,
        email,
        postsCount: posts.length,
        commentsCount: comments.length
    }));

    users.sort((a, b) => b.postsCount - a.postsCount);

    console.log(users);
});

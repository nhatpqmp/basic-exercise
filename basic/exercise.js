const axios = require('axios');
const fs = require('fs');

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

//Requirement 2

(async () => {
    try {
        const data = await fetchDataFromAPI(apiUsers);
        fs.writeFileSync('./r2.json', JSON.stringify(data, null, 2));
        console.log('Data written to r2.json');
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();

//Requirement 3
async function getUserMapData(callback) {
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

        return processedData = callback(usersCustomData);
    } catch (error) {
        console.error('Error: ', error.message);
    }
}


(async () => {
    try {
        const data = await getUserMapData(data => {
            fs.writeFileSync('./r3.json', JSON.stringify(data, null, 2));
            console.log('Data written to r3.json');
        });
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();

//Requirement 4
async function getUsersWithMoreThan3Comments(callback) {
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

        const usersWithMoreThan3Comments = usersCustomData.filter(user => user.comments.length > 3);
        callback(usersWithMoreThan3Comments);
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

(async () => {
    try {
        const data = await getUsersWithMoreThan3Comments(data => {
            fs.writeFileSync('./r4.json', JSON.stringify(data, null, 2));
            console.log('Data written to r4.json');
        });
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();

//Requirement 5

async function reformatDataUser() {
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

        const usersWithMoreThan3Comments = usersCustomData.filter(user => user.comments.length > 3);
        const usersMapData = usersWithMoreThan3Comments.map(({ id, name, username, email, posts, comments }) => ({
            id,
            name,
            username,
            email,
            postsCount: posts.length,
            commentsCount: comments.length
        }));
        return(usersMapData);
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

(async () => {
    try {
        const data = reformatDataUser();
        fs.writeFileSync('./r5.json', JSON.stringify(data, null, 2));
        console.log('Data written to r5.json');
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();

//Requirement 6

async function getTopUser() {
    try {
        const users = await reformatDataUser();
        const userWithMaxPosts = users.reduce((maxUser, currentUser) =>
                currentUser.postsCount > maxUser.postsCount ? currentUser : maxUser,
            users[0]
        );
        const userWithMaxComments = users.reduce((maxUser, currentUser) =>
                currentUser.commentsCount > maxUser.commentsCount ? currentUser : maxUser,
            users[0]
        );

        return {
            userWithMaxPosts,
            userWithMaxComments
        };
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

(async () => {
    try {
        const data = await getTopUser();
        fs.writeFileSync('./r6.json', JSON.stringify(data, null, 2));
        console.log('Data written to r6.json');
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();

//Requirement 7

(async () => {
    try {
        const users = await getUserMapData((data) => {
            const processedData = data.map(({ id, name, username, email, posts, comments }) => ({
                id,
                name,
                username,
                email,
                postsCount: posts.length,
                commentsCount: comments.length
            }));

            processedData.sort((a, b) => b.postsCount - a.postsCount);

            return processedData;
        });

        fs.writeFileSync('./r7.json', JSON.stringify(users, null, 2));
        console.log('Data written to r7.json');
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();

//Requirement 8

async function getPostWithComment(id) {
    try {
        const posts = await fetchDataFromAPI(apiPosts);
        const comments = await fetchDataFromAPI(apiComments);

        const commentsForPost1 = comments.filter(comment => comment.postId === id);
        const postWithId1 = posts.filter(posts => posts.id === id);

        return {
            ...postWithId1,
            comments: commentsForPost1
        };
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

(async () => {
    try {
        const data = await getPostWithComment(1);
        fs.writeFileSync('./r8.json', JSON.stringify(data, null, 2));
        console.log('Data written to r8.json');
    } catch (error) {
        console.error('Error: ', error.message);
    }
})();

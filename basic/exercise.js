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

(async () => {
    try {
        const [users, posts, comments] = await Promise.all([
            fetchDataFromAPI(apiUsers),
            fetchDataFromAPI(apiPosts),
            fetchDataFromAPI(apiComments)
        ]);
        //Requirement 2
        fs.writeFileSync('./r2.json', JSON.stringify(users, null, 2));
        console.log('Data written to r2.json');

        //Requirement 3

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

        fs.writeFileSync('./r3.json', JSON.stringify(usersCustomData, null, 2));
        console.log('Data written to r3.json');

        //Requirement 4

        const usersWithMoreThan3Comments = usersCustomData.filter(user => user.comments.length > 3);
        fs.writeFileSync('./r4.json', JSON.stringify(usersCustomData, null, 2));
        console.log('Data written to r4.json');

        //Requirement 5

        const usersMapData = usersWithMoreThan3Comments.map(({ id, name, username, email, posts, comments }) => ({
            id,
            name,
            username,
            email,
            postsCount: posts.length,
            commentsCount: comments.length
        }));

        fs.writeFileSync('./r5.json', JSON.stringify(usersMapData, null, 2));
        console.log('Data written to r5.json');

        //Requirement 6

        const userWithMaxPosts = users.reduce((maxUser, currentUser) =>
                currentUser.postsCount > maxUser.postsCount ? currentUser : maxUser,
            users[0]
        );
        const userWithMaxComments = users.reduce((maxUser, currentUser) =>
                currentUser.commentsCount > maxUser.commentsCount ? currentUser : maxUser,
            users[0]
        );

        fs.writeFileSync('./r6.json', JSON.stringify(({
            userWithMaxPosts,
            userWithMaxComments
        }), null, 2));
        console.log('Data written to r6.json');

        //Requirement 7

        const processedData = usersCustomData.map(({ id, name, username, email, posts, comments }) => ({
            id,
            name,
            username,
            email,
            postsCount: posts.length,
            commentsCount: comments.length
        }));

        processedData.sort((a, b) => b.postsCount - a.postsCount);
        fs.writeFileSync('./r7.json', JSON.stringify(processedData, null, 2));
        console.log('Data written to r7.json');

        //Requirement 8
        const commentsForPost1 = comments.filter(comment => comment.postId === 1);
        const post1 = posts.filter(posts => posts.id === 1);

        const post1WithComments = {
            ...post1,
            comments: commentsForPost1
        };

        fs.writeFileSync('./r8.json', JSON.stringify(post1WithComments, null, 2));
        console.log('Data written to r8.json');

    } catch (error) {
        console.error('Error: ', error.message);
    }
})();
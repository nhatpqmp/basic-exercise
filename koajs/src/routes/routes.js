const Router = require('koa-router');
const bookHandler = require('../handlers/books/bookHandlers');

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

// Routes will go here
router.get('/books', bookHandler.getBooks);
router.get('/books/:id', bookHandler.getBook);

router.post('/books', bookHandler.save);

module.exports = router;


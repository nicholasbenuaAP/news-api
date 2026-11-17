const router = require('express').Router();
const c = require('../controllers/authors.controller');

router.get('/api/authors', c.getAuthors);
router.get('/api/authors/:id/articles', c.getArticlesByAuthor);

module.exports = router;

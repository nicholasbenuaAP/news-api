const router = require('express').Router();
const c = require('../controllers/articles.controller');

router.get('/api/articles', c.getArticles);
router.get('/api/articles/search', c.searchArticles);  // harus sebelum /:id
router.get('/api/articles/:id', c.getArticleById);
router.post('/api/articles', c.postArticle);

module.exports = router;

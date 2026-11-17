const model = require('../models/articles.model');

exports.getArticles = async (req, res, next) => {
  try { res.json(await model.selectArticles()); } catch (err) { next(err); }
};

exports.searchArticles = async (req, res, next) => {
  try { res.json(await model.searchArticles(req.query.q || '')); }
  catch (err) { next(err); }
};

exports.getArticleById = async (req, res, next) => {
  try {
    if (!/^\d+$/.test(req.params.id))
      return res.status(400).json({ error: 'id harus angka' });
    const article = await model.selectArticleById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) { next(err); }
};

exports.postArticle = async (req, res, next) => {
  try {
    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id)
      return res.status(400).json({ error: 'title, content, author_id wajib' });
    res.status(201).json(await model.insertArticle(title, content, author_id));
  } catch (err) { next(err); }
};

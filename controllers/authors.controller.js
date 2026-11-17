const model = require('../models/authors.model');

exports.getAuthors = async (req, res, next) => {
  try { res.json(await model.selectAuthors()); } catch (err) { next(err); }
};

exports.getArticlesByAuthor = async (req, res, next) => {
  try {
    if (!/^\d+$/.test(req.params.id))
      return res.status(400).json({ error: 'id harus angka' });
    res.json(await model.selectArticlesByAuthor(req.params.id));
  } catch (err) { next(err); }
};

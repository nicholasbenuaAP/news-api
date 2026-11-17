const db = require('../db/db');

exports.selectAuthors = async () => {
  const { rows } = await db.query('SELECT id, name FROM authors ORDER BY id');
  return rows;
};

exports.selectArticlesByAuthor = async (id) => {
  const { rows } = await db.query(
    `SELECT id, title, published_at FROM articles
     WHERE author_id = $1 ORDER BY published_at DESC LIMIT 20`, [id]);
  return rows;
};

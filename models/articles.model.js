const db = require('../db/db');

exports.selectArticles = async () => {
  const { rows } = await db.query(
    `SELECT a.id, a.title, a.published_at, au.name AS author
     FROM articles a JOIN authors au ON au.id = a.author_id
     ORDER BY a.published_at DESC LIMIT 20`);
  return rows;
};

exports.searchArticles = async (q) => {
  const { rows } = await db.query(
    `SELECT a.id, a.title, au.name AS author
     FROM articles a JOIN authors au ON au.id = a.author_id
     WHERE a.content ILIKE $1
     ORDER BY a.published_at DESC LIMIT 20`, [`%${q}%`]);
  return rows;
};

exports.selectArticleById = async (id) => {
  const { rows } = await db.query(
    `SELECT a.*, au.name AS author FROM articles a
     JOIN authors au ON au.id = a.author_id WHERE a.id = $1`, [id]);
  return rows[0];
};

exports.insertArticle = async (title, content, author_id) => {
  const { rows } = await db.query(
    `INSERT INTO articles (title, content, author_id)
     VALUES ($1,$2,$3) RETURNING *`, [title, content, author_id]);
  return rows[0];
};

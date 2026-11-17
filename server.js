const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet()); // Security headers (OWASP)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(require('./routes/articles-router'));   // sesuai modul: nama route kasus
app.use(require('./routes/authors-router'));    // TAMBAHAN (entitas authors)

// TAMBAHAN: penanganan error terpusat (konsep dari repo news-api)
const { handlePgErrors, handleServerErrors } = require('./controllers/errors.controller');
app.use(handlePgErrors, handleServerErrors);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App on port ${PORT}`));

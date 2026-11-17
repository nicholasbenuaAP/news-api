exports.handlePgErrors = (err, req, res, next) => {
  // 22P02 = tipe data salah, 23503 = foreign key tidak ada
  if (err.code === '22P02' || err.code === '23503')
    return res.status(400).json({ error: 'Input tidak valid' });
  next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};

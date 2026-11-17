CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES authors(id),
  published_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO authors (name) VALUES
  ('Redaksi Pontianak'), ('Redaksi Singkawang'), ('Redaksi Sambas');

-- 50.000 artikel agar endpoint search benar-benar "berat"
INSERT INTO articles (title, content, author_id, published_at)
SELECT 'Berita Kalbar #' || g,
       repeat('Pembangunan di Kalimantan Barat terus berjalan. ', 40) || ' Barat ' || g,
       1 + (g % 3),
       NOW() - (g || ' minutes')::interval
FROM generate_series(1, 50000) g;

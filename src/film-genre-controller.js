const db = require('../db/db');

module.exports = class FilmGenreController {
    async getFilmGenre(req, res) {
        try {
            const {film_id, genre_id} = req.body;
            const film_genre = await db.query(
                `SELECT film.id, title, year, genre_id, genre_name FROM film_genre INNER JOIN film ON id = film_id INNER JOIN genre ON genre.id = genre_id WHERE film.id = $1 AND genre.id = $2`,
                [film_id, genre_id]
            );
            res.send(film_genre.rows[0]);
        } catch(err) {
            res.send(err);
        }
    }
    async createFilmGenre(req, res) {
        try {
            const {film_id, genre_id} = req.body;
            const film_genre = await db.query(`INSERT INTO film_genre (film_id, genre_id) values ($1, $2) RETURNING *`, [film_id, genre_id]);
            res.send(film_genre.rows);
        } catch (err) {
            res.send(err);
        }
    }

    async updateFilmGenre(req, res) {
        try {
            const {film_id, genre_id, new_film_id, new_genre_id} = req.body;
            let film_genre = {};
            if (new_film_id && new_genre_id) {
                film_genre = await db.query(`UPDATE film_genre SET film_id = $1, genre_id = $2 WHERE film_id = $3 AND genre_id = $4 RETURNING *`, [new_film_id, new_genre_id, film_id, genre_id]);
            } else if (new_film_id) {
                film_genre = await db.query(`UPDATE film_genre SET film_id = $1 WHERE film_id = $2 AND genre_id = $3 RETURNING *`, [new_film_id, film_id, genre_id]);
            } else if (new_genre_id) {
                film_genre = await db.query(`UPDATE film_genre SET genre_id = $1 WHERE film_id = $2 AND genre_id = $3 RETURNING *`, [new_genre_id, film_id, genre_id]);
            }
            res.send(film_genre.rows);
        } catch (err) {
            res.send(err);
        }
    }

    async deleteFilmGenre(req, res) {
        try {
            const {film_id, genre_id} = req.body;
            const film_genre = await db.query(`DELETE FROM film_genre WHERE film_id = $1 AND genre_id = $2`, [film_id, genre_id]);
            res.send(film_genre.rows[0]);
        } catch (err) {
            res.send(err);
        }
    }
}
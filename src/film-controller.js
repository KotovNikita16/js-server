const db = require('../db/db');

module.exports = class FilmController {
    async getFilm(req, res) {
        try {
            if (req.params.id) {
                const film = await db.query(
                    `SELECT film.id, title, year, genre_id, genre_name FROM film_genre RIGHT OUTER JOIN film ON id = film_id LEFT OUTER JOIN genre ON genre.id = genre_id WHERE film.id = $1`,
                    [req.params.id]
                );
                res.send(film.rows);
            }

            const films = await db.query(`SELECT * FROM film`);
            res.send(films.rows);
        } catch (err) {
            res.send(err);
        }
    }

    async createFilm(req, res) {
        try {
            const {title, year} = req.body;
            const newFilm = await db.query(`INSERT INTO film (title, year) values ($1, $2) RETURNING *`, [title, year]);
            res.send(newFilm);
        } catch (err) {
            res.send(err);
        }
    }

    async updateFilm(req, res) {
        try {
            const {title, year} = req.body;
            const film = await db.query(`UPDATE film SET title = $1, year = $2 WHERE id = $3 RETURNING *`, [title, year, req.params.id]);
            res.send(film.rows[0]);
        } catch (err) {
            res.send(err);
        }
    }
    async deleteFilm(req, res) {
        try {
            const film = await db.query(`DELETE FROM film WHERE id = $1`, [req.params.id]);
            res.send(film.rows[0]);
        } catch (err) {
            res.send(err);
        }
    }
}
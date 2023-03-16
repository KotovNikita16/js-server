const db = require('../db/db');

module.exports = class GenreController {
    async getGenre(req, res) {
        try {
            if (req.params.id) {
                const genre = await db.query(
                    `SELECT genre.id, genre_name, film_id, title, year FROM film_genre RIGHT OUTER JOIN genre ON id = genre_id LEFT OUTER JOIN film ON film.id = film_id WHERE genre.id = $1`,
                    [req.params.id]
                );
                res.send(genre.rows);
            }

            const genre = await db.query(`SELECT * FROM genre`);
            res.send(genre.rows);
        } catch (err) {
            res.send(err);
        }
    }
    async createGenre(req, res) {
        try {
            const {genre_name} = req.body;
            const newGenre = await db.query(`INSERT INTO genre (genre_name) values ($1) RETURNING *`, [genre_name]);
            res.send(newGenre.rows);
        } catch (err) {
            res.send(err);
        }
    }

    async updateGenre(req, res) {
        try {
            const {genre_name} = req.body;
            const genre = await db.query(`UPDATE genre SET genre_name = $1 WHERE id = $2 RETURNING *`, [genre_name, req.params.id]);
            res.send(genre.rows[0]);
        } catch (err) {
            res.send(err);
        }
    }
    async deleteGenre(req, res) {
        try {
            const genre = await db.query(`DELETE FROM genre WHERE id = $1`, [req.params.id]);
            res.send(genre.rows[0]);
        } catch (err) {
            res.send(err);
        }
    }
}
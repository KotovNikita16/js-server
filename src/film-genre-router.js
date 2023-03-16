const Router = require('../framework/Router');
const FilmGenreController = require('./film-genre-controller');

const router = new Router();
const filmGenreController = new FilmGenreController();

router.get('/film/genre', filmGenreController.getFilmGenre);
router.post('/film/genre', filmGenreController.createFilmGenre);
router.put('/film/genre', filmGenreController.updateFilmGenre);
router.delete('/film/genre', filmGenreController.deleteFilmGenre);

module.exports = router;
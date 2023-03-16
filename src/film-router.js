const Router = require('../framework/Router');
const FilmController = require('./film-controller');

const router = new Router();
const filmController = new FilmController();

router.get('/film', filmController.getFilm);
router.post('/film', filmController.createFilm);
router.put('/film', filmController.updateFilm);
router.delete('/film', filmController.deleteFilm);

module.exports = router;
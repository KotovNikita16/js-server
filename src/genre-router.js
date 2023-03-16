const Router = require('../framework/Router');
const GenreController = require('./genre-controller');

const router = new Router();
const genreController = new GenreController();

router.get('/genre', genreController.getGenre);
router.post('/genre', genreController.createGenre);
router.put('/genre', genreController.updateGenre);
router.delete('/genre', genreController.deleteGenre);

module.exports = router;
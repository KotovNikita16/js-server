const PORT = process.env.PORT || 3000;
const Application = require('./framework/Application');
const filmRouter = require('./src/film-router');
const genreRouter = require('./src/genre-router');
const filmGenreRouter = require('./src/film-genre-router');
const jsonParser = require('./framework/parseJson');
const urlParser = require('./framework/parseUrl');
const bodyParser = require('./framework/bodyParser');

const app = new Application();

app.use(jsonParser);
app.use(bodyParser);
app.use(urlParser(`http://localhost:${PORT}`));

app.addRouter(filmRouter);
app.addRouter(genreRouter);
app.addRouter(filmGenreRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
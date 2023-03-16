# js-server
 
Написать маленький сервер на nodeJS, который работает с упрощенной базой данных фильмов (/db/db.sql):

**таблица жанров**
* pk
* название жанра

**таблица фильмов**
* pk
* название
* год выпуска

У каждого фильма может быть несколько жанров.
Реализовать на nodeJS CRUD опреации для взаимодействия с жанрами с CRUD операции для взаимодействия с фильмами.
Тестировать свою работу можно через postman. В качестве результатов сервер просто возвращает данные в JSON формате.

Для фильмов:

* Retrieve: GET http://localhost:3000/film - вернёт все фильмы, GET http://localhost:3000/film?id=x - вернёт фильм с id=x с его жанрами
* Create: POST http://localhost:3000/film - создаст новый фильм в соответствии с json {"title": "xxx", "year": xxx}
* Update: PUT http://localhost:3000/film?id=x - обновит данные о фильме с id=x в соответствии с json {"title": "xxx", "year": xxx}
* Delete: DELETE http://localhost:3000/film?id=x - удалит фильм с id=x и все связанные с ним записи.

Для жанров:

* Retrieve: GET http://localhost:3000/genre - вернёт все жанры, GET http://localhost:3000/genre?id=x - вернёт все фильмы жанра id=x
* Create: POST http://localhost:3000/genre - создаст новый жанр в соответствии с json {"genre_name": "xxx"}
* Update: PUT http://localhost:3000/genre?id=x - обновит данные о жанре с id=x в соответствии с json {"genre_name": "xxx"}
* Delete: DELETE http://localhost:3000/genre?id=x - удалит жанр с id=x и все связанные с ним записи.

Для работы с жанрами конкретного фильма:

* Retrieve: GET http://localhost:3000/film/genre - вернет фильм и его жанр в соответствии с json {"film_id": xxx, "genre_id": xxx}
* Create: POST http://localhost:3000/film/genre - добавит жанр к фильму в соотвтетствии с json {"film_id": xxx, "genre_id": xxx}
* Update: PUT http://localhost:3000/film/genre?id=x - обновит данные о жанре фильма в соответствии с json {"film_id": xxx, "genre_id": xxx, "new_film_id": xxx, "new_genre_id": xxx}, причем необязательно наличие и new_film_id, и new_genre_id: тогда обновится либо фильм у жанра, либо жанр у соотвтетстующего фильма
* Delete: DELETE http://localhost:3000/film/genre?id=x - удалит жанр у фильма в соответствии с json {"film_id": xxx, "genre_id": xxx}.

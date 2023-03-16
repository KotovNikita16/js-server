-- Table: public.film

-- DROP TABLE IF EXISTS public.film;

CREATE TABLE IF NOT EXISTS public.film
(
    title text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    year numeric NOT NULL,
    CONSTRAINT film_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.film
    OWNER to postgres;

COMMENT ON TABLE public.film
    IS 'информация о фильме';

-- Table: public.genre

-- DROP TABLE IF EXISTS public.genre;

CREATE TABLE IF NOT EXISTS public.genre
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    genre_name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT genre_pkey PRIMARY KEY (id),
    CONSTRAINT genre_name_unique UNIQUE (genre_name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.genre
    OWNER to postgres;

COMMENT ON TABLE public.genre
    IS 'жанры фильмов';

-- Table: public.film_genre

-- DROP TABLE IF EXISTS public.film_genre;

CREATE TABLE IF NOT EXISTS public.film_genre
(
    film_id bigint NOT NULL,
    genre_id bigint NOT NULL,
    CONSTRAINT film_genre_pkey PRIMARY KEY (film_id, genre_id),
    CONSTRAINT film_fkey FOREIGN KEY (film_id)
        REFERENCES public.film (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT genre_fkey FOREIGN KEY (genre_id)
        REFERENCES public.genre (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.film_genre
    OWNER to postgres;

COMMENT ON TABLE public.film_genre
    IS 'связь фильма и его жанра';

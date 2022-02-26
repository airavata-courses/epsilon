CREATE DATABASE epsilon;

\connect epsilon;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	email varchar(255) NOT NULL,
	first_name varchar(255) NULL,
	last_name varchar(255) NULL,
	google_id varchar(255) NOT NULL,
	image_url varchar(255) NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT users_email_unique UNIQUE (email),
	CONSTRAINT users_google_id_unique UNIQUE (google_id),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);
BEGIN;

CREATE TABLE IF NOT EXISTS roles
(
    id   SMALLSERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users
(
    id                    BIGSERIAL PRIMARY KEY,
    role_id               SMALLINT                 NOT NULL REFERENCES roles ON DELETE CASCADE,
    full_name             VARCHAR(64)              NOT NULL,
    email                 VARCHAR(64)              NOT NULL UNIQUE,
    password              VARCHAR(24)              NOT NULL,
	sign_in_date          TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at            TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at            TIMESTAMP WITH TIME ZONE NOT NULL
);

COMMIT;

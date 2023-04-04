BEGIN;

CREATE TABLE IF NOT EXISTS contacts
(
    id           BIGSERIAL PRIMARY KEY,
    full_name    SMALLINT                 NOT NULL REFERENCES locations_types,
    email        VARCHAR(64)              NOT NULL,
    phone_number VARCHAR(64)              NOT NULL,
	company      VARCHAR(255)             NOT NULL,
	job_title    VARCHAR(64)              NOT NULL,
    created_at   TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at   TIMESTAMP WITH TIME ZONE NOT NULL
);

COMMIT;
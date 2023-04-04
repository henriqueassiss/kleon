package postgres

import (
	"fmt"
	"log"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

var (
	DB  *sqlx.DB
	err error
)

func Initialize() error {
	log.Println("Initiating database")

	dataSourceName := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
		os.Getenv("POSTGRES_PORT"),
		os.Getenv("POSTGRES_SSL_MODE"))

	DB, err = sqlx.Connect("postgres", dataSourceName)
	if err != nil {
		log.Println(err)
		return err
	}

	log.Println("Database initialized")
	return nil
}

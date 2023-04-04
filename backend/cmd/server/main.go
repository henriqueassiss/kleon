package main

import (
	"log"
	"os"

	_s "github.com/henriqueassiss/kleon/internal/server"
	p "github.com/henriqueassiss/kleon/pkg/postgres"
)

func main() {
	log.Println("Application initialized")

	err := p.Initialize()
	if err != nil {
		os.Exit(1)
	}

	if os.Getenv("ENVIRONMENT") == "dev" {
		err = p.InsertFakeData()
		if err != nil {
			os.Exit(1)
		}
	}

	var s _s.HttpServer
	err = s.Initialize()
	if err != nil {
		os.Exit(1)
	}
}

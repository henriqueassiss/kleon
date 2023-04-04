package server

import (
	"log"
	"net/http"
	"os"

	r "github.com/henriqueassiss/kleon/internal/routes"
)

type HttpServer struct {
	Server *http.Server
}

func (s *HttpServer) Initialize() error {
	log.Println("Server initialized")

	r := r.Router()
	s.Server = &http.Server{
		Addr:    ":" + os.Getenv("API_PORT"),
		Handler: r,
	}

	err := s.Server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		log.Println("Error initializating server", err)
		return err
	}

	return nil
}

package routes

import (
	h "github.com/henriqueassiss/kleon/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func ContactRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Get("/", h.GetContactsHandler)
	return r
}

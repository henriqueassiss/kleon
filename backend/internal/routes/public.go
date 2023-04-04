package routes

import (
	h "github.com/henriqueassiss/kleon/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func PublicRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Get("/{id:[0-9]+}", h.GetImageHandler)
	return r
}

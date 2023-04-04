package routes

import (
	"net/http"
	"os"

	m "github.com/henriqueassiss/kleon/internal/middlewares"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func Router() *chi.Mux {
	r := chi.NewRouter()
	c := cors.Options{
		AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodDelete},
		AllowedOrigins: []string{os.Getenv("CLIENT_URI")},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
		MaxAge:         300,
	}
	r.Use(cors.Handler(c))
	r.Use(m.SetHeaders)
	r.Mount("/api", r)
	r.Mount("/user", UserRouter())
	return r
}

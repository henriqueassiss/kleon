package routes

import (
	h "github.com/henriqueassiss/kleon/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func UserRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Post("/create", h.CreateUserHandler)
	r.Post("/authenticate", h.AuthenticateUserHandler)
	r.Post("/recover-password", h.RecoverUserPasswordHandler)
	return r
}

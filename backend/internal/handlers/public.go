package handlers

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	res "github.com/henriqueassiss/kleon/pkg/utils/http"
)

func GetImageHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}

	buf, err := os.ReadFile("public/" + id + ".jpg")
	if err != nil {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "image/png")
	w.Write(buf)
}

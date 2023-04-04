package handlers

import (
	"net/http"

	s "github.com/henriqueassiss/kleon/internal/services"
	res "github.com/henriqueassiss/kleon/pkg/utils/http"
)

func GetContactsHandler(w http.ResponseWriter, r *http.Request) {
	offset := r.URL.Query().Get("offset")
	if offset == "" {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}

	cs, err := s.GetContactsService(offset)
	if err != nil {
		res.Respond(w, false, nil, http.StatusInternalServerError)
		return
	}

	res.Respond(w, true, cs, http.StatusOK)
}

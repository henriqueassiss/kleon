package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	m "github.com/henriqueassiss/kleon/internal/models"
	s "github.com/henriqueassiss/kleon/internal/services"
	res "github.com/henriqueassiss/kleon/pkg/utils/http"
	v "github.com/henriqueassiss/kleon/pkg/utils/validator"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	type Res struct {
		UserID uint64 `json:"userId"`
		Token  string `json:"token"`
	}

	var u m.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	if !u.Validate() {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}

	id, jwt, err := s.CreateUserService(u)
	if err != nil {
		fmt.Println(err)
		if err.Error() == "user already exists" {
			res.Respond(w, false, nil, http.StatusForbidden)
		} else {
			res.Respond(w, false, nil, http.StatusInternalServerError)
		}
		return
	}

	res.Respond(w, true, Res{UserID: id, Token: jwt}, http.StatusOK)
}

func AuthenticateUserHandler(w http.ResponseWriter, r *http.Request) {
	type Res struct {
		UserID uint64 `json:"userId"`
		Token  string `json:"token"`
	}

	var u m.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	if !v.ValidateEmail(u.Email) || !v.ValidateBasicPassword(u.Password) {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}

	id, jwt, err := s.AuthenticateUserService(u)
	if err != nil {
		if err.Error() == "sql: no rows in result set" || err.Error() == "crypto/bcrypt: hashedPassword is not the hash of the given password" {
			res.Respond(w, false, nil, http.StatusUnauthorized)
		} else {
			res.Respond(w, false, nil, http.StatusInternalServerError)
		}
		return
	}

	res.Respond(w, true, Res{UserID: id, Token: jwt}, http.StatusOK)
}

func RecoverUserPasswordHandler(w http.ResponseWriter, r *http.Request) {
	var u m.User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		res.Respond(w, false, nil, http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	err = s.RecoverUserPasswordService(u.Email)
	if err != nil {
		res.Respond(w, false, nil, http.StatusUnauthorized)
		return
	}

	res.Respond(w, true, nil, http.StatusOK)
}

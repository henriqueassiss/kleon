package pkg

import (
	"bytes"
	"encoding/json"
	"net/http"
	"strings"
)

type Response struct {
	Success bool `json:"success"`
	Data    any  `json:"data"`
}

func Respond(w http.ResponseWriter, isSuccess bool, data any, code int) {
	w.WriteHeader(code)
	res := Response{Success: isSuccess, Data: data}
	json.NewEncoder(w).Encode(res)
}

func RemovePortFromIpAddress(s string) string {
	i := strings.LastIndex(s, ":")
	if i == -1 {
		return ""
	}
	return s[:i]
}

func CreateRequest(method, url string, body interface{}) (*http.Request, error) {
	reqBody, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(method, url, bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, err
	}

	return req, nil
}

func MakeRequest(method, url string, body interface{}) (*http.Response, error) {
	req, err := CreateRequest(method, url, body)
	if err != nil {
		return nil, err
	}

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}

	return res, nil
}

package middlewares

import (
	"net/http"
)

func SetHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.Header().Set("Content-Type", "application/json")
		res.Header().Set("X-Content-Type-Options", "nosniff")
		next.ServeHTTP(res, req)
	})
}

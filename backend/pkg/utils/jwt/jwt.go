package pkg

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type JwtClaim struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

func CreateJwt(email string) (string, error) {
	expiresIn := time.Now().Local().Add(24 * time.Hour)
	claims := JwtClaim{
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresIn),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString([]byte(os.Getenv("API_SECRET")))
	if err != nil {
		return "", err
	}

	return tokenStr, nil
}

func ValidateJwt(jwtToken, email string) error {
	token, err := jwt.ParseWithClaims(
		jwtToken,
		&JwtClaim{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("API_SECRET")), nil
		},
	)
	if err != nil {
		return err
	}

	claims, isValid := token.Claims.(*JwtClaim)
	if !isValid || claims.Email != email {
		return errors.New("invalid token")
	}

	return nil
}

package services

import (
	"errors"

	m "github.com/henriqueassiss/kleon/internal/models"
	p "github.com/henriqueassiss/kleon/pkg/postgres"
	jwt "github.com/henriqueassiss/kleon/pkg/utils/jwt"
)

func CreateUserService(u m.User) (uint64, string, error) {
	existingUser := m.User{Email: u.Email}
	err := existingUser.FindUserByEmail()
	if existingUser.ID > 0 {
		return 0, "", errors.New("user already exists")
	} else if err.Error() != "sql: no rows in result set" {
		return 0, "", err
	}

	err = u.PrepareCreate()
	if err != nil {
		return 0, "", err
	}

	tx := p.DB.MustBegin()
	jwtToken, err := jwt.CreateJwt(u.Email)
	if err != nil {
		tx.Rollback()
		return 0, "", err
	}

	err = u.CreateUser(tx)
	if err != nil {
		tx.Rollback()
		return 0, "", err
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return 0, "", err
	}

	return u.ID, jwtToken, nil
}

func AuthenticateUserService(u m.User) (uint64, string, error) {
	existingUser := m.User{Email: u.Email}
	err := existingUser.FindUserByEmail()
	if err != nil {
		return 0, "", err
	}

	err = u.ComparePasswordHash(existingUser.Password)
	if err != nil {
		return 0, "", err
	}

	jwtToken, err := jwt.CreateJwt(existingUser.Email)
	if err != nil {
		return 0, "", err
	}

	err = existingUser.UpdateUserSignInDate()
	if err != nil {
		return 0, "", err
	}

	return existingUser.ID, jwtToken, nil
}

func RecoverUserPasswordService(email string) error {
	existingUser := m.User{Email: email}
	err := existingUser.FindUserByEmail()
	if err != nil {
		return err
	}

	return nil
}

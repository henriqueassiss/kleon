package models

import (
	"strings"
	"time"

	q "github.com/henriqueassiss/kleon/internal/queries"
	p "github.com/henriqueassiss/kleon/pkg/postgres"
	v "github.com/henriqueassiss/kleon/pkg/utils/validator"

	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID         uint64    `json:"id" db:"id"`
	RoleID     uint8     `json:"roleId" db:"role_id"`
	FullName   string    `json:"fullName" db:"full_name"`
	Email      string    `json:"email" db:"email"`
	Password   string    `json:"password" db:"password"`
	SignInDate time.Time `json:"signInDate" db:"sign_in_date"`
	CreatedAt  time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt  time.Time `json:"updatedAt" db:"updated_at"`
}

func (u *User) CreateUser(tx *sqlx.Tx) error {
	isLocalTransaction := false
	if tx == nil {
		tx = p.DB.MustBegin()
		isLocalTransaction = true
	}

	rows, err := tx.NamedQuery(q.CreateUserQuery, &u)
	if err != nil {
		tx.Rollback()
		return err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&u.ID)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	if isLocalTransaction {
		err = tx.Commit()
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return nil
}

func (u *User) FindUserById() error {
	err := p.DB.Get(u, q.FindUserByIdQuery, u.ID)
	return err
}

func (u *User) FindUserByEmail() error {
	err := p.DB.Get(u, q.FindUserByEmailQuery, u.Email)
	return err
}

func (u *User) UpdateUserSignInDate() error {
	tx := p.DB.MustBegin()
	_, err := tx.Exec(q.UpdateUserSignInDateQuery)
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return err
	}

	return nil
}

func (u *User) PrepareCreate() error {
	u.FullName = strings.TrimSpace(u.FullName)
	u.Email = strings.ToLower(strings.TrimSpace(u.Email))
	u.Password = strings.TrimSpace(u.Password)

	err := u.GeneratePasswordHash()
	if err != nil {
		return err
	}

	return nil
}

func (u *User) GeneratePasswordHash() error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(u.Password), 12)
	if err != nil {
		return err
	}

	u.Password = string(bytes)
	return nil
}

func (u *User) ComparePasswordHash(storedPasswordHash string) error {
	return bcrypt.CompareHashAndPassword([]byte(storedPasswordHash), []byte(u.Password))
}

func (u *User) Validate() bool {
	if u.RoleID == 0 || !v.ValidateFullName(u.FullName) || !v.ValidateEmail(u.Email) || !v.ValidatePassword(u.Password) {
		return false
	}

	return true
}

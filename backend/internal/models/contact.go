package models

import (
	"time"

	q "github.com/henriqueassiss/kleon/internal/queries"
	p "github.com/henriqueassiss/kleon/pkg/postgres"
)

type Contact struct {
	ID          uint64    `json:"id" db:"id"`
	FullName    string    `json:"fullName" db:"full_name"`
	Email       string    `json:"email" db:"email"`
	PhoneNumber string    `json:"phoneNumber" db:"phone_number"`
	Company     uint64    `json:"company" db:"company"`
	JobTitle    string    `json:"jobTitle" db:"job_title"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt   time.Time `json:"updatedAt" db:"updated_at"`
}

func (u *Contact) FindContacts(offset string) ([]Contact, error) {
	c := []Contact{}
	err := p.DB.Select(c, q.FindContactsQuery, offset)
	return c, err
}

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
	Company     string    `json:"company" db:"company"`
	JobTitle    string    `json:"jobTitle" db:"job_title"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	UpdatedAt   time.Time `json:"updatedAt" db:"updated_at"`
}

func (c *Contact) FindContacts(offset string) ([]Contact, error) {
	cs := []Contact{}
	err := p.DB.Select(&cs, q.FindContactsQuery, offset)
	return cs, err
}

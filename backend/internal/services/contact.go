package services

import (
	m "github.com/henriqueassiss/kleon/internal/models"
)

func GetContactsService(offset string) ([]m.Contact, error) {
	var c m.Contact
	cs, err := c.FindContacts(offset)
	if err != nil {
		return cs, err
	}

	return cs, nil
}

package models

type Role struct {
	ID   uint8  `json:"id" db:"id"`
	Name string `json:"name" db:"name"`
}

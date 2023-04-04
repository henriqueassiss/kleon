package pkg

import (
	"regexp"
	"unicode"
)

func ValidateFullName(name string) bool {
	regex := `^([A-Z][a-z]{3,64} )([A-Z][a-z]{1,64} )?([A-Z][a-z]{2,64})$`
	match, err := regexp.MatchString(regex, name)
	if err != nil {
		return false
	}
	return match
}

func ValidateEmail(email string) bool {
	regex := `^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`
	match, err := regexp.MatchString(regex, email)
	if err != nil {
		return false
	}

	return match
}

func ValidateBasicPassword(password string) bool {
	return len(password) >= 8
}

func ValidatePassword(password string) bool {
	number := false
	downcase := false
	uppercase := false
	moreThan8Chars := len(password) >= 8

	for _, c := range password {
		switch {
		case unicode.IsNumber(c):
			number = true
		case unicode.IsUpper(c):
			uppercase = true
		case unicode.IsLetter(c) || c == ' ':
			downcase = true
		}
	}

	return moreThan8Chars && number && downcase && uppercase
}

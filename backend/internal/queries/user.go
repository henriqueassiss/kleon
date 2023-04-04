package queries

var (
	CreateUserQuery = `INSERT INTO users (role_id, address_id, full_name, email, password, is_brazilian_document, national_id, phone_number,
	gender, birthday, is_active, created_at, updated_at)
VALUES (:role_id, :address_id, :full_name, :email, :password, :is_brazilian_document, :national_id, :phone_number,
:gender, :birthday, :is_active, NOW(), NOW())
RETURNING id`

	FindUserByIdQuery = `SELECT * FROM users WHERE id = $1 LIMIT 1`

	FindUserByEmailQuery = `SELECT * FROM users WHERE email = $1 LIMIT 1`

	FindUserByCpfQuery = `SELECT * FROM users WHERE is_brazilian_document = true AND national_id = $1 LIMIT 1`

	FindUserByPhoneNumberQuery = `SELECT * FROM users WHERE phone_number = $1 LIMIT 1`

	UpdateUserSignInDateQuery = `UPDATE users SET sign_in_date = NOW()`
)

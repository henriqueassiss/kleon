package queries

var (
	CreateUserQuery = `INSERT INTO users (role_id, full_name, email, password, sign_in_date, created_at, updated_at)
VALUES (:role_id, :full_name, :email, :password, :sign_in_date, NOW(), NOW())
RETURNING id`

	FindUserByIdQuery = `SELECT * FROM users WHERE id = $1 LIMIT 1`

	FindUserByEmailQuery = `SELECT * FROM users WHERE email = $1 LIMIT 1`

	UpdateUserSignInDateQuery = `UPDATE users SET sign_in_date = NOW()`
)

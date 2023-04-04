package queries

var (
	CreateContactQuery = `INSERT INTO contacts (company_id, full_name, email, phone_number,
	job_title, created_at, updated_at)
VALUES (:company_id, :full_name, :email, :phone_number, :job_title, NOW(), NOW())`

	FindContactsQuery = `SELECT * FROM contacts LIMIT 12 OFFSET $1`
)

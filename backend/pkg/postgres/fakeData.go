package postgres

import (
	"fmt"
	"log"
)

var createContactsQuery = `INSERT INTO contacts (id, name, email, phone_number, company, job_title, created_at, updated_at)
VALUES
(1, 'John Smith', 'john.smith@example.com', '+1-555-555-5551', 'ABC Corp', 'Sales Manager', NOW(), NOW()),
(2, 'Mary Johnson', 'mary.johnson@example.com', '+1-555-555-5552', 'XYZ Inc', 'Marketing Director', NOW(), NOW()),
(3, 'Robert Garcia', 'robert.garcia@example.com', '+1-555-555-5553', '123 LLC', 'Software Engineer', NOW(), NOW()),
(4, 'Emma Lee', 'emma.lee@example.com', '+1-555-555-5554', 'XYZ Inc', 'Product Manager', NOW(), NOW()),
(5, 'Michael Chen', 'michael.chen@example.com', '+1-555-555-5555', 'ABC Corp', 'Sales Representative', NOW(), NOW()),
(6, 'Grace Lee', 'grace.lee@example.com', '+1-555-555-5556', '456 Inc', 'HR Manager', NOW(), NOW()),
(7, 'David Kim', 'david.kim@example.com', '+1-555-555-5557', 'ABC Corp', 'Marketing Manager', NOW(), NOW()),
(8, 'Cindy Wong', 'cindy.wong@example.com', '+1-555-555-5558', '123 LLC', 'Accountant', NOW(), NOW()),
(9, 'Samantha Lee', 'samantha.lee@example.com', '+1-555-555-5559', 'XYZ Inc', 'Software Engineer', NOW(), NOW()),
(10, 'Tom Johnson', 'tom.johnson@example.com', '+1-555-555-5560', '456 Inc', 'Sales Manager', NOW(), NOW()),
(11, 'Jessica Kim', 'jessica.kim@example.com', '+1-555-555-5561', 'ABC Corp', 'Sales Representative', NOW(), NOW()),
(12, 'Timothy Park', 'timothy.park@example.com', '+1-555-555-5562', 'XYZ Inc', 'Product Manager', NOW(), NOW()),
(13, 'Karen Chen', 'karen.chen@example.com', '+1-555-555-5563', '123 LLC', 'Marketing Manager', NOW(), NOW()),
(14, 'Daniel Lee', 'daniel.lee@example.com', '+1-555-555-5564', '456 Inc', 'Software Engineer', NOW(), NOW()),
(15, 'Jennifer Kim', 'jennifer.kim@example.com', '+1-555-555-5565', 'ABC Corp', 'HR Manager', NOW(), NOW()),
(16, 'Kevin Chang', 'kevin.chang@example.com', '+1-555-555-5566', 'XYZ Inc', 'Sales Representative', NOW(), NOW()),
(17, 'Grace Park', 'grace.park@example.com', '+1-555-555-5567', '123 LLC', 'Accountant', NOW(), NOW()),
(18, 'Matthew Lee', 'matthew.lee@example.com', '+1-555-555-5568', 'ABC Corp', 'Software Engineer', NOW(), NOW()),
(19, 'Sophia Kim', 'sophia.kim@example.com', '+1-555-555-5569', '456 Inc', 'Product Manager', NOW(), NOW()),
(20, 'Oliver Lee', 'oliver.lee@example.com', '+1-555-555-5570', 'XYZ Inc', 'Sales Manager', NOW(), NOW()),
(21, 'Alex Chen', 'alex.chen@example.com', '+1-555-555-5571', 'ABC Corp', 'Marketing Manager', NOW(), NOW()),
(22, 'Bob Jackson', 'bob.jackson@example.com', '+1-555-555-5572', 'ABC Corp', 'Tech Lead', NOW(), NOW()),
(23, 'Thomas Brown', 'thomas.brown@example.com', '+1-555-555-5573', 'Globe Corp', 'CMO', NOW(), NOW()),
(24, 'John Miller', 'john.miller@example.com', '+1-555-555-5574', 'XYZ Corp', 'Product Manager', NOW(), NOW()),
ON CONFLICT DO NOTHING;`

func InsertFakeData() error {
	log.Println("Initiating fake data insertion")

	tx := DB.MustBegin()
	query := fmt.Sprint(createContactsQuery)
	tx.Exec(query)

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return err
	}

	log.Println("Fake data insertion finalized")
	return nil
}

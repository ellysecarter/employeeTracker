INSERT INTO department (name)
VALUES
('HR'),
('Sales'),
('Retention'),
('Marketing'),
('IT'),
('Contracting & Licensing'),
('Management');


INSERT INTO role (title, salary, department_id)
VALUES
('HR Specialist', 80000, 1),
('Sales Representative', 40000, 2),
('Retention Specialist', 35000, 3),
('Marketing Specialist', 45000, 4),
('Analyst', 90000, 5),
('Management', 120000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jimmy', 'Jones', 1, null),
('Joshua', 'Moleander', 2, null),
('Christopher', 'Kingston', 3, null),
('Charlene', 'Williams', 4, null),
('Katherine', 'Mansfield', 5, null),
('Kyle', 'Carrington', 6, null);
USE cms_db;

INSERT INTO departments (name) VALUES ('Management');
INSERT INTO departments (name) VALUES ('HR');
INSERT INTO departments (name) VALUES ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES ('Accountant',30.00,3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Mike','Wasousky',1,null);
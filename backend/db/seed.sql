DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS instructors;

-- ================= UNIVERSITY TABLES =================

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT
);

CREATE TABLE instructors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  course_name VARCHAR(100),
  instructor_id INT REFERENCES instructors(id)
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id)
);

CREATE TABLE marks (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id INT REFERENCES courses(id),
  score INT
);

-- ================= HR TABLES =================

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(100)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary INT,
  department_id INT REFERENCES departments(id)
);

-- ================= E-COMMERCE TABLES =================

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(100),
  price INT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_date DATE,
  customer_name VARCHAR(100)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT
);

-- ================= SAMPLE DATA =================

INSERT INTO students (name, age) VALUES
('Ayush', 21),
('Rahul', 19),
('Ankit', 23);

INSERT INTO instructors (name) VALUES
('Dr. Sharma'),
('Prof. Mehta');

INSERT INTO courses (course_name, instructor_id) VALUES
('CS', 1),
('IT', 2);

INSERT INTO enrollments (student_id, course_id) VALUES
(1,1),(2,2),(3,1);

INSERT INTO marks (student_id, course_id, score) VALUES
(1,1,85),(2,2,78),(3,1,92);

INSERT INTO departments (department_name) VALUES
('Engineering'),('HR'),('Sales');

INSERT INTO employees (name, salary, department_id) VALUES
('Rohit', 60000, 1),
('Neha', 50000, 2),
('Karan', 75000, 1);

INSERT INTO products (product_name, price) VALUES
('Laptop', 70000),
('Phone', 30000),
('Tablet', 20000);

INSERT INTO orders (order_date, customer_name) VALUES
('2024-01-01','Ayush'),
('2024-01-05','Rahul');

INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1,1,1),
(1,2,2),
(2,3,1);
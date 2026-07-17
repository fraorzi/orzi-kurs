CREATE TABLE students (
  id BIGINT PRIMARY KEY
);

CREATE TABLE courses (
  id BIGINT PRIMARY KEY
);

CREATE TABLE enrollments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  student_id BIGINT,
  course_id BIGINT,
  status VARCHAR(20)
);

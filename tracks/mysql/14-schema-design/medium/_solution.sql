CREATE TABLE students (
  id BIGINT PRIMARY KEY
);

CREATE TABLE courses (
  id BIGINT PRIMARY KEY
);

CREATE TABLE enrollments (
  student_id BIGINT NOT NULL,
  course_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'completed', 'cancelled')),
  enrolled_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (student_id, course_id),
  CONSTRAINT fk_enrollment_student
    FOREIGN KEY (student_id) REFERENCES students(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_enrollment_course
    FOREIGN KEY (course_id) REFERENCES courses(id)
    ON DELETE RESTRICT
);

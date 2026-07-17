CREATE TABLE ticket_statuses (
  code VARCHAR(20) PRIMARY KEY,
  label VARCHAR(80) NOT NULL
);

CREATE TABLE tickets (
  id BIGINT PRIMARY KEY,
  status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_tickets_status
    FOREIGN KEY (status) REFERENCES ticket_statuses(code)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

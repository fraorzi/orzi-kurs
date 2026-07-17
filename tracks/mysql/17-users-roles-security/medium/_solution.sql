CREATE USER 'orzi_service'@'localhost'
  IDENTIFIED BY 'training-only'
  REQUIRE SSL
  WITH MAX_USER_CONNECTIONS 5
  PASSWORD EXPIRE INTERVAL 90 DAY;

GRANT SELECT, INSERT, UPDATE ON app_data.*
  TO 'orzi_service'@'localhost';

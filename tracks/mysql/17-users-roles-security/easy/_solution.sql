CREATE ROLE 'orzi_app_reader';
GRANT SELECT ON app_data.* TO 'orzi_app_reader';

CREATE USER 'orzi_app_api'@'localhost'
  IDENTIFIED BY 'training-only';
GRANT 'orzi_app_reader' TO 'orzi_app_api'@'localhost';
SET DEFAULT ROLE 'orzi_app_reader'
  TO 'orzi_app_api'@'localhost';

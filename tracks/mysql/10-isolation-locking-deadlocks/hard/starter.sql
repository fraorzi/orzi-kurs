CREATE PROCEDURE move_stock(IN p_from INT, IN p_to INT, IN p_qty INT)
main: BEGIN
  DECLARE attempts INT DEFAULT 0;
  DECLARE should_retry BOOLEAN DEFAULT TRUE;

  WHILE should_retry AND attempts < 1 DO
    SET attempts = attempts + 1;
    SET should_retry = FALSE;
    BEGIN
      DECLARE deadlocked BOOLEAN DEFAULT FALSE;
      DECLARE CONTINUE HANDLER FOR 1213 SET deadlocked = TRUE;

      START TRANSACTION;
      UPDATE bins SET quantity = quantity - p_qty WHERE id = p_from;
      DO SLEEP(0.12);
      UPDATE bins SET quantity = quantity + p_qty WHERE id = p_to;
      IF deadlocked THEN
        ROLLBACK;
        SET should_retry = TRUE;
      ELSE
        COMMIT;
      END IF;
    END;
  END WHILE;

  IF should_retry THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'deadlock retry exhausted';
  END IF;
END

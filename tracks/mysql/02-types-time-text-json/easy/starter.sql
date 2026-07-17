SELECT SUM(quantity * CAST(unit_price AS DOUBLE)) AS total FROM invoice_lines;

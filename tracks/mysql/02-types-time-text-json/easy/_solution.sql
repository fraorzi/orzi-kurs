SELECT CAST(SUM(quantity * unit_price) AS DECIMAL(12,2)) AS total FROM invoice_lines;

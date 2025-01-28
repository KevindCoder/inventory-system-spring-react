-- Get number of orders for each status
SELECT status, COUNT(*) AS order_count
FROM orders
GROUP BY status;

-- Get top selling products
SELECT P.name                               AS productName,
       P.price                              AS productPrice,
       SUM(OD.product_quantity)             AS totalQuantitySold,
       (P.price * SUM(OD.product_quantity)) AS totalSoldAmount
FROM order_details OD
         JOIN products P ON OD.product_id = P.product_id
         JOIN orders O ON OD.order_id = O.order_id
WHERE O.status != 'REJECTED'
GROUP BY P.product_id, P.name, P.price
ORDER BY totalQuantitySold DESC;

-- Get Products & quantity sold in the past week for each day of the week for the past week
SELECT P.name                   AS product_name,
       SUM(OD.product_quantity) AS total_quantity_sold,
       DAYNAME(O.created_at)    AS day_of_week,
       DATE(O.created_at)       AS sale_date
FROM order_details OD
         JOIN
     products P ON OD.product_id = P.product_id
         JOIN
     orders O ON OD.order_id = O.order_id
WHERE O.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY P.name, day_of_week, sale_date
ORDER BY sale_date, product_name;


-- Get total sold for each day of the past 2 weeks
WITH RECURSIVE
    -- Generate dates for the past 14 days (including today)
    dates AS (SELECT CURRENT_DATE - INTERVAL 13 DAY AS sale_date
              UNION ALL
              SELECT sale_date + INTERVAL 1 DAY
              FROM dates
              WHERE sale_date < CURRENT_DATE),
    -- Calculate total sales for each date
    sales AS (SELECT DATE(o.created_at) AS sale_date, SUM(od.product_quantity * p.price) AS total_sold
              FROM order_details od
                       JOIN orders o ON od.order_id = o.order_id
                       JOIN products p ON od.product_id = p.product_id
              WHERE o.created_at >= CURRENT_DATE - INTERVAL 13 DAY
              GROUP BY DATE(o.created_at))
-- Combine the dates with sales, ensuring 0 for missing days, and categorize as CURRENT or PAST
SELECT d.sale_date,
       COALESCE(s.total_sold, 0)                                           AS total_sold,
       IF(d.sale_date >= CURRENT_DATE - INTERVAL 6 DAY, 'CURRENT', 'PAST') AS period
FROM dates d
         LEFT JOIN
     sales s ON d.sale_date = s.sale_date
ORDER BY d.sale_date;

-- Get percentage amount sold per city
SELECT C.city                                                                    AS city,
       ROUND((SUM(OD.product_quantity * P.price) / total.total_amount) * 100, 2) AS percentage_sold
FROM orders O
         JOIN order_details OD ON O.order_id = OD.order_id
         JOIN customers C ON O.customer_id = C.customer_id
         JOIN products P ON OD.product_id = P.product_id
         CROSS JOIN
     (SELECT SUM(OD.product_quantity * P.price) AS total_amount
      FROM orders O
               JOIN order_details OD ON O.order_id = OD.order_id
               JOIN products P ON OD.product_id = P.product_id) total
GROUP BY C.city, total.total_amount
ORDER BY percentage_sold DESC;
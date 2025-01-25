-- Get number of orders for each status
SELECT status, COUNT(*) AS order_count
FROM orders
GROUP BY status;

-- Get Products & quantity sold in the past week for each day of the week for the past week
USE inventory_system;

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

# WITH RECURSIVE
#     -- Get days for the report starting from today up to 13 days ago
#     dates AS (SELECT CURRENT_DATE - INTERVAL 13 DAY AS sale_date
#               UNION ALL
#               SELECT sale_date + INTERVAL 1 DAY
#               FROM dates
#               WHERE sale_date < CURRENT_DATE),
#     -- Get sales for each of the selected days of the past 2 weeks
#     sales AS (SELECT DATE(o.created_at) AS sale_date,
#                      SUM(od.price)      AS total_sold
#               FROM order_details od
#                        JOIN
#                    orders o ON od.order_id = o.order_id
#               WHERE o.created_at >= CURRENT_DATE - INTERVAL 13 DAY
#               GROUP BY DATE(o.created_at))
# SELECT d.sale_date,
#        COALESCE(s.total_sold, 0)                                           AS total_sold,
#        IF(d.sale_date >= CURRENT_DATE - INTERVAL 6 DAY, 'CURRENT', 'PAST') AS period
# FROM dates d
#          LEFT JOIN
#      sales s ON d.sale_date = s.sale_date
# ORDER BY d.sale_date DESC;


# Total sales this and past week
# MON, TUE, ...TABLE

# Sales by city % of total sales
# ALL TIME

# Top selling products
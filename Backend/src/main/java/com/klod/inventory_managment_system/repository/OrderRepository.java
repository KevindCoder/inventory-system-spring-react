package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.OrderEntity;
import com.klod.inventory_managment_system.model.projection.MostSoldProductsProjection;
import com.klod.inventory_managment_system.model.projection.OrderCountProjection;
import com.klod.inventory_managment_system.model.projection.PercentageSoldPerCityProjection;
import com.klod.inventory_managment_system.model.projection.TotalAmountSoldPerDayProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    @Query(value = "SELECT status, COUNT(*) as totalOrders FROM orders GROUP BY status",
            nativeQuery = true)
    List<OrderCountProjection> findTotalOrdersPerStatus();

    @Query(value =
            "SELECT P.name AS productName, P.price AS productPrice, SUM(OD.product_quantity) AS totalQuantitySold, " +
                    "(P.price * SUM(OD.product_quantity)) AS totalSoldAmount " +
                    "FROM order_details OD JOIN products P ON OD.product_id = P.product_id " +
                    "                      JOIN orders O ON OD.order_id = O.order_id " +
                    "WHERE O.status != 'REJECTED' " +
                    "GROUP BY P.product_id, P.name, P.price " +
                    "ORDER BY totalQuantitySold DESC",
            nativeQuery = true)
    List<MostSoldProductsProjection> findMostSoldProducts();

    @Query(value =
            "WITH RECURSIVE dates AS (SELECT CURRENT_DATE - INTERVAL 13 DAY AS sale_date UNION ALL "
                    + "SELECT sale_date + INTERVAL 1 DAY FROM dates WHERE sale_date < CURRENT_DATE), "
                    + "sales AS (SELECT DATE(o.created_at) AS sale_date, "
                    + "SUM(od.product_quantity * p.price) AS total_sold FROM order_details od "
                    + "JOIN orders o ON od.order_id = o.order_id "
                    + "JOIN products p ON od.product_id = p.product_id "
                    + "WHERE o.created_at >= CURRENT_DATE - INTERVAL 13 DAY "
                    + "GROUP BY DATE(o.created_at)) "
                    + "SELECT d.sale_date, COALESCE(s.total_sold, 0) AS total_sold, "
                    + "IF(d.sale_date >= CURRENT_DATE - INTERVAL 6 DAY, 'CURRENT', 'PAST') AS period "
                    + "FROM dates d LEFT JOIN sales s ON d.sale_date = s.sale_date "
                    + "ORDER BY d.sale_date",
            nativeQuery = true)
    List<TotalAmountSoldPerDayProjection> findTotalAmountSoldPerPastDays(Integer numberOfDays);

    @Query(value = "SELECT C.city AS city, "
            + "ROUND((SUM(OD.product_quantity * P.price) / total.total_amount) * 100, 2) AS percentage_sold "
            + "FROM orders O JOIN order_details OD ON O.order_id = OD.order_id "
            + "JOIN customers C ON O.customer_id = C.customer_id "
            + "JOIN products P ON OD.product_id = P.product_id "
            + "CROSS JOIN  "
            + "(SELECT SUM(OD.product_quantity * P.price) AS total_amount "
            + "    FROM orders O JOIN order_details OD ON O.order_id = OD.order_id "
            + "    JOIN products P ON OD.product_id = P.product_id "
            + ") total "
            + "GROUP BY C.city, total.total_amount "
            + "ORDER BY percentage_sold DESC",
            nativeQuery = true)
    List<PercentageSoldPerCityProjection> findPercentageSoldPerCity();
}
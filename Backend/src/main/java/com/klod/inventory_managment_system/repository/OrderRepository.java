package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.OrderEntity;
import com.klod.inventory_managment_system.model.projection.OrderCountProjection;
import com.klod.inventory_managment_system.model.projection.Report2Projection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    @Query(value = "SELECT P.name as productName, SUM(OD.product_quantity) as totalQuantitySold, "
            + "DAYNAME(O.created_at) as dayOfTheWeek, DATE (O.created_at) as saleDate "
            + "FROM order_details OD JOIN products P ON OD.product_id = P.product_id "
            + "JOIN orders O ON OD.order_id = O.order_id "
            + "WHERE O.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) "
            + "GROUP BY P.name, dayOfTheWeek, saleDate "
            + "ORDER BY saleDate, productName",
            nativeQuery = true)
    List<Report2Projection> findTotalQuantitySoldPastWeekPerProduct();

    @Query(value = "SELECT status, COUNT(*) as totalOrders FROM orders GROUP BY status",
            nativeQuery = true)
    List<OrderCountProjection> findTotalOrdersPerStatus();
}
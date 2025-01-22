package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}
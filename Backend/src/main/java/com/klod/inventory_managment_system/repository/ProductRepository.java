package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
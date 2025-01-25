package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    boolean existsByName(String name);

    @Query("SELECT p FROM ProductEntity p WHERE p.stock <= :stock")
    List<ProductEntity> findAllStockLessThan(Integer stock);
}
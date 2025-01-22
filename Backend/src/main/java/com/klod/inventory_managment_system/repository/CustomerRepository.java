package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
}
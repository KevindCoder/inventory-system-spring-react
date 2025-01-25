package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.ProviderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderRepository extends JpaRepository<ProviderEntity, Long> {
    boolean existsByName(String name);
}
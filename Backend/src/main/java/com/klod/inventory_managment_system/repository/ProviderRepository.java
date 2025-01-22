package com.klod.inventory_managment_system.repository;

import com.klod.inventory_managment_system.model.entity.ProviderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProviderRepository extends JpaRepository<ProviderEntity, Long> {
}
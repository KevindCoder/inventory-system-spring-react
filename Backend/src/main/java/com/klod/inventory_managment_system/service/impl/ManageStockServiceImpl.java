package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.model.entity.ProductEntity;
import com.klod.inventory_managment_system.repository.ProductRepository;
import com.klod.inventory_managment_system.service.ManageStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ManageStockServiceImpl implements ManageStockService {
    private final ProductRepository productRepository;

    @Override
    public void removeStock(Long productId, int quantity) {
        //TODO add log & custom exceptions
        ProductEntity productEntity = productRepository.findById(productId).orElseThrow();
        if (productEntity.getStock() < quantity) {
            throw new IllegalArgumentException("Not enough stock");
        }
        productEntity.setStock(productEntity.getStock() - quantity);
        productRepository.save(productEntity);
    }
}

package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.mapper.ProductMapper;
import com.klod.inventory_managment_system.model.dto.OutOfStockDTO;
import com.klod.inventory_managment_system.model.entity.ProductEntity;
import com.klod.inventory_managment_system.repository.ProductRepository;
import com.klod.inventory_managment_system.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public List<OutOfStockDTO> getOutOfStockProducts() {
        log.info("Getting list of almost out of stock products");
        List<ProductEntity> products = productRepository.findAllStockLessThan(10);
        return productMapper.mapToOutOfStockListDTO(products);
    }
}

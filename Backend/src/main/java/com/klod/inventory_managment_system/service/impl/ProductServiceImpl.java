package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.mapper.ProductMapper;
import com.klod.inventory_managment_system.model.dto.ProductDTO;
import com.klod.inventory_managment_system.model.entity.ProductEntity;
import com.klod.inventory_managment_system.repository.ProductRepository;
import com.klod.inventory_managment_system.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    public ProductDTO getProductById(Long id) {
        log.info("Attempting to retrieve product by id: {}", id);
        ProductEntity productEntity = productRepository.findById(id).orElseThrow();
        return productMapper.productToProductDto(productEntity);
    }

    @Override
    public void saveProduct(ProductDTO productDTO) {
        log.info("Saving product: {}", productDTO);
        ProductEntity productEntity = productMapper.productDtoToProduct(productDTO);
        productRepository.save(productEntity);
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        log.info("Retrieving all products");
        List<ProductEntity> productEntities = productRepository.findAll();
        return productMapper.productEntitiesToProductDTOs(productEntities);
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }
}
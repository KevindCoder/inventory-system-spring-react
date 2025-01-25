package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.exception.EntityNotFoundException;
import com.klod.inventory_managment_system.mapper.ProductMapper;
import com.klod.inventory_managment_system.model.dto.ProductDTO;
import com.klod.inventory_managment_system.model.dto.request.ProductRequestDTO;
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
        ProductEntity productEntity = getProductEntityById(id);
        return productMapper.mapToDTO(productEntity);
    }

    @Override
    public ProductDTO saveProduct(ProductRequestDTO productDTO) {
        log.info("Saving product: {}", productDTO);
        validateNameAvailable(productDTO.getName());
        ProductEntity productEntity = productMapper.mapToEntity(productDTO);
        productEntity = productRepository.save(productEntity);
        return productMapper.mapToDTO(productEntity);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductRequestDTO productDTO) {
        log.info("Updating product with id: {}", id);
        ProductEntity productEntity = getProductEntityById(id);
        if (!productEntity.getName().equals(productDTO.getName())) {
            validateNameAvailable(productDTO.getName());
        }
        productMapper.updateEntity(productEntity, productDTO);
        productEntity = productRepository.save(productEntity);
        return productMapper.mapToDTO(productEntity);
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        log.info("Retrieving all products");
        List<ProductEntity> productEntities = productRepository.findAll();
        return productMapper.mapToListDTO(productEntities);
    }

    @Override
    public void deleteProductById(Long id) {
        log.info("Deleting product with id: {}", id);
        ProductEntity productEntity = getProductEntityById(id);
        productRepository.delete(productEntity);
    }

    private ProductEntity getProductEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
    }

    private void validateNameAvailable(String name) {
        if (productRepository.existsByName(name)) {
            throw new EntityNotFoundException("Product with name: " + name + " already exists");
        }
    }
}
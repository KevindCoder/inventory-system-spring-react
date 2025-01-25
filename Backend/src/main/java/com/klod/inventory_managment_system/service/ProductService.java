package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.ProductDTO;
import com.klod.inventory_managment_system.model.dto.request.ProductRequestDTO;

import java.util.List;

public interface ProductService {
    ProductDTO getProductById(Long id);

    ProductDTO saveProduct(ProductRequestDTO productDTO);

    ProductDTO updateProduct(Long id, ProductRequestDTO productDTO);

    List<ProductDTO> getAllProducts();

    void deleteProductById(Long id);
}
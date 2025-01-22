package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.ProductDTO;
import java.util.List;

public interface ProductService {
    ProductDTO getProductById(Long id);
    void saveProduct(ProductDTO productDTO);
    List<ProductDTO> getAllProducts();
    void deleteProductById(Long id);
}
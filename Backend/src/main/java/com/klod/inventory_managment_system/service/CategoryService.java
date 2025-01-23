package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.CategoryDTO;
import com.klod.inventory_managment_system.model.dto.ProductDTO;

import java.util.List;

public interface CategoryService {
    CategoryDTO getCategoryById(Long id);

    CategoryDTO saveCategory(CategoryDTO categoryDTO);

    CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);

    List<CategoryDTO> getAllCategories();

    void deleteCategoryById(Long id);

    List<ProductDTO> getCategoryProducts(Long id);
}
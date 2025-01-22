package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.CategoryDTO;
import java.util.List;

public interface CategoryService {
    CategoryDTO getCategoryById(Long id);
    void saveCategory(CategoryDTO categoryDTO);
    List<CategoryDTO> getAllCategories();
    void deleteCategoryById(Long id);
}
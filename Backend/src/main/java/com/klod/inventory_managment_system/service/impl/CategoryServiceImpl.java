package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.mapper.CategoryMapper;
import com.klod.inventory_managment_system.model.dto.CategoryDTO;
import com.klod.inventory_managment_system.model.entity.CategoryEntity;
import com.klod.inventory_managment_system.repository.CategoryRepository;
import com.klod.inventory_managment_system.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDTO getCategoryById(Long id) {
        log.info("Attempting to retrieve category by id: {}", id);
        CategoryEntity categoryEntity = categoryRepository.findById(id).orElseThrow();
        return categoryMapper.categoryToCategoryDto(categoryEntity);
    }

    @Override
    public void saveCategory(CategoryDTO categoryDTO) {
        log.info("Saving category: {}", categoryDTO);
        CategoryEntity categoryEntity = categoryMapper.categoryDtoToCategory(categoryDTO);
        categoryRepository.save(categoryEntity);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        log.info("Retrieving all categories");
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        return categoryMapper.categoryEntitiesToCategoryDTOs(categoryEntities);
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }
}
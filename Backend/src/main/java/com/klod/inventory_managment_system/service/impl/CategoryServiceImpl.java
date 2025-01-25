package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.exception.EntityAlreadyExistsException;
import com.klod.inventory_managment_system.exception.EntityNotFoundException;
import com.klod.inventory_managment_system.mapper.CategoryMapper;
import com.klod.inventory_managment_system.mapper.ProductMapper;
import com.klod.inventory_managment_system.model.dto.CategoryDTO;
import com.klod.inventory_managment_system.model.dto.ProductDTO;
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
    private final ProductMapper productMapper;

    @Override
    public CategoryDTO getCategoryById(Long id) {
        log.info("Attempting to retrieve category by id: {}", id);
        CategoryEntity categoryEntity = getCategoryEntityById(id);
        return categoryMapper.mapToDTO(categoryEntity);
    }

    @Override
    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
        log.info("Saving category: {}", categoryDTO);
        validateNameAvailable(categoryDTO.getName());

        CategoryEntity categoryEntity = categoryMapper.mapToEntity(categoryDTO);
        categoryEntity = categoryRepository.save(categoryEntity);
        return categoryMapper.mapToDTO(categoryEntity);
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        log.info("Updating category with id: {}", id);
        CategoryEntity categoryEntity = getCategoryEntityById(id);
        if (!categoryEntity.getName().equals(categoryDTO.getName())) {
            validateNameAvailable(categoryDTO.getName());
            categoryMapper.updateEntity(categoryEntity, categoryDTO);
            categoryEntity = categoryRepository.save(categoryEntity);
        }

        return categoryMapper.mapToDTO(categoryEntity);
    }

    @Override
    public List<CategoryDTO> getAllCategories() {
        log.info("Retrieving all categories");
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        return categoryMapper.mapToListDTO(categoryEntities);
    }

    @Override
    public void deleteCategoryById(Long id) {
        log.info("Deleting category by id: {}", id);
        CategoryEntity categoryEntity = getCategoryEntityById(id);
        categoryRepository.delete(categoryEntity);
    }

    @Override
    public List<ProductDTO> getCategoryProducts(Long id) {
        log.info("Retrieving products for category: {}", id);
        CategoryEntity categoryEntity = getCategoryEntityById(id);
        return productMapper.mapToListDTO(categoryEntity.getProducts());
    }

    private CategoryEntity getCategoryEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + id));
    }

    private void validateNameAvailable(String name) {
        if (!categoryRepository.existsByName(name)) {
            throw new EntityAlreadyExistsException("Category with name: " + name + " already exists");
        }
    }
}
package com.klod.inventory_managment_system.api;

import com.klod.inventory_managment_system.model.dto.ProductDTO;
import com.klod.inventory_managment_system.model.dto.request.ProductRequestDTO;
import com.klod.inventory_managment_system.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/products")
@Validated
public class ProductController {

    private final ProductService productService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO productDTO = productService.getProductById(id);
        return ResponseEntity.ok(productDTO);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> saveProduct(@Valid @RequestBody ProductRequestDTO productDTO) {
        ProductDTO response = productService.saveProduct(productDTO);
        return ResponseEntity.status(201).body(response); // 201 Created
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequestDTO productDTO) {
        ProductDTO response = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.status(204).build(); // 204 No Content
    }
}
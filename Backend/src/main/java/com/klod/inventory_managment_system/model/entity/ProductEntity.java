package com.klod.inventory_managment_system.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
public class ProductEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "name", nullable = false, unique = true, length = 45)
    private String name;

    @Column(name = "brand", nullable = false, length = 45)
    private String brand;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "weight", length = 20)
    private String weight;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private ProviderEntity provider;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;
}
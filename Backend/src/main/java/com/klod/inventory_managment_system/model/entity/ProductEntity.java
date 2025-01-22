package com.klod.inventory_managment_system.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product")
@Getter
@Setter
public class ProductEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false, unique = true, length = 45)
    private String name;

    @Column(nullable = false, length = 45)
    private String brand;

    @Column(nullable = false)
    private int stock;

    @Column(nullable = false)
    private int purchasePrice;

    @Column(nullable = false)
    private int salePrice;

    @Column(length = 20)
    private String weight;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private ProviderEntity provider;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;
}
package com.klod.inventory_managment_system.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "provider")
@Getter
@Setter
public class ProviderEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long providerId;

    @Column(nullable = false, unique = true, length = 45)
    private String name;

    @Column(length = 20)
    private String phoneNumber;

    @Column(unique = true)
    private String email;
}

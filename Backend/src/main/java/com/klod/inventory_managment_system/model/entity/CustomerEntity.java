package com.klod.inventory_managment_system.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class CustomerEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @Column(nullable = false, length = 45)
    private String name;

    @Column(length = 20)
    private String phoneNumber;

    @Column(unique = true, length = 255)
    private String email;

    @Column(nullable = false, unique = true, length = 45)
    private String document;

    @Column(length = 255)
    private String address;

    @Column(length = 45)
    private String state;

    @Column(length = 45)
    private String city;
}
package com.klod.inventory_managment_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(scanBasePackages = "com.klod.inventory_managment_system")
@EnableJpaAuditing(auditorAwareRef = "auditAware")
public class InventoryManagmentSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryManagmentSystemApplication.class, args);
    }

}

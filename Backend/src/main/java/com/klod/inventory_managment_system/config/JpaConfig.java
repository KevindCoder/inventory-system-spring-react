package com.klod.inventory_managment_system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.klod.inventory_managment_system.repository")
@Configuration
public class JpaConfig {

}

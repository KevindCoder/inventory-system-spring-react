package com.klod.inventory_managment_system.config;

import com.klod.inventory_managment_system.repository.UserRepository;
import com.klod.inventory_managment_system.service.impl.AuditAwareImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.klod.inventory_managment_system.repository")
@Configuration
public class JpaConfig {

    @Bean
    public AuditorAware<Long> auditAware(UserRepository userRepository) {
        return new AuditAwareImpl(userRepository);
    }
}

package com.klod.inventory_managment_system.config.security;

import com.klod.inventory_managment_system.model.entity.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
public class UserPrincipal implements UserDetails {
    private UserEntity userEntity;
    private Long userId;

    public UserPrincipal(UserEntity userEntity) {
        this.userEntity = userEntity;
        this.userId = userEntity.getUserId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.userEntity.getRole() != null) {
            return List.of(new SimpleGrantedAuthority(this.userEntity.getRole().name()));
        }
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return this.userEntity.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return this.userEntity.getUsername();
    }
}

package com.klod.inventory_managment_system.model.dto.request;

import com.klod.inventory_managment_system.model.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
    private String name;

    private String username;

    private String password;

    private String phoneNumber;

    private String email;

    private Role role;
}

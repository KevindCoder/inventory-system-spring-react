package com.klod.inventory_managment_system.model.dto;

import com.klod.inventory_managment_system.model.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Long userId;

    private String name;

    private String username;

    private String phoneNumber;

    private String email;

    private Role role;
}

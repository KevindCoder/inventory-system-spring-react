package com.klod.inventory_managment_system.model.dto.request;

import com.klod.inventory_managment_system.model.entity.Role;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
    @NotNull(message = "Name cannot be null")
    @NotEmpty(message = "Name cannot be empty")
    private String name;

    @NotNull(message = "Username cannot be null")
    @NotEmpty(message = "Username cannot be empty")
    private String username;

    @NotNull(message = "Password cannot be null")
    @NotEmpty(message = "Password cannot be empty")
    private String password;

    private String phoneNumber;

    @NotNull(message = "Email cannot be null")
    @NotEmpty(message = "Email cannot be empty")
    private String email;

    @NotNull(message = "Role cannot be null")
    private Role role;
}

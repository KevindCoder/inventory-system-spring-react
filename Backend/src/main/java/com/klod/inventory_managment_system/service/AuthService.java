package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.JwtResponse;
import com.klod.inventory_managment_system.model.dto.LoginRequest;

public interface AuthService {
    JwtResponse authenticate(LoginRequest request);
}

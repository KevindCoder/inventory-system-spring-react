package com.klod.inventory_managment_system.service;

import com.klod.inventory_managment_system.model.dto.JwtResponse;
import com.klod.inventory_managment_system.model.dto.request.LoginRequestDTO;

public interface AuthService {
    JwtResponse authenticate(LoginRequestDTO request);
}

package com.klod.inventory_managment_system.service.impl;

import com.klod.inventory_managment_system.model.dto.JwtResponse;
import com.klod.inventory_managment_system.model.dto.LoginRequest;
import com.klod.inventory_managment_system.service.AuthService;
import com.klod.inventory_managment_system.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Override
    public JwtResponse authenticate(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            String token = jwtUtil.generateToken(request.getUsername(), authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
            return new JwtResponse(token);
        } catch (Exception ex) {
            throw new RuntimeException("Could not be authenticated.");
        }
    }
}

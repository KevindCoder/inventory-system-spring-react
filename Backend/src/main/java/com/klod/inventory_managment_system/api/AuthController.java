package com.klod.inventory_managment_system.api;

import com.klod.inventory_managment_system.model.dto.JwtResponse;
import com.klod.inventory_managment_system.model.dto.request.LoginRequestDTO;
import com.klod.inventory_managment_system.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}

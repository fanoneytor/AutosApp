package com.softtek.autos.api.controller;

import com.softtek.autos.api.dto.LoginRequest;
import com.softtek.autos.api.dto.RegisterRequest;
import com.softtek.autos.application.service.AuthService;
import com.softtek.autos.application.service.RegisterUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final RegisterUserService registerUserService;
    private final AuthService authService;

    public AuthController(RegisterUserService registerUserService, AuthService authService) {
        this.registerUserService = registerUserService;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody @Valid LoginRequest request) {
        String token = authService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequest request) {
        registerUserService.register(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

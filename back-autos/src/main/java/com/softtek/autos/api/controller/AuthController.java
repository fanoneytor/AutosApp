package com.softtek.autos.api.controller;

import com.softtek.autos.api.dto.RegisterRequest;
import com.softtek.autos.application.service.RegisterUserService;
import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.UserRepository;
import com.softtek.autos.infrastructure.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final RegisterUserService registerUserService;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, RegisterUserService registerUserService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.registerUserService = registerUserService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        var userOpt = userRepository.findByUsername(body.get("username"));

        if (userOpt.isEmpty() || !BCrypt.checkpw(body.get("password"), userOpt.get().getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        var token = jwtUtil.generateToken(userOpt.get().getId());
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = new User();
        user.setUsername(request.username());
        user.setPassword(request.password());
        User saved = registerUserService.register(user);
        return ResponseEntity.ok(Map.of("id", saved.getId()));
    }
}

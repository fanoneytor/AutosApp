package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.UserRepository;
import com.softtek.autos.infrastructure.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public String login(String username, String rawPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return jwtUtil.generateToken(user.getId());
    }
}

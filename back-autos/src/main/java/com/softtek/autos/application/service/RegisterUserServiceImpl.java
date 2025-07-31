package com.softtek.autos.application.service;

import com.softtek.autos.api.dto.RegisterRequest;
import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.UserRepository;
import com.softtek.autos.infrastructure.exception.BadRequestException;
import com.softtek.autos.infrastructure.persistence.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RegisterUserServiceImpl implements RegisterUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public RegisterUserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @Override
    public User register(RegisterRequest registerRequest) {
        User user = userMapper.toDomain(registerRequest);

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new BadRequestException("El nombre de usuario '" + user.getUsername() + "' ya está en uso.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setId(UUID.randomUUID());

        return userRepository.save(user);
    }
}

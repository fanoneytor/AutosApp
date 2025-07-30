package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.UUID;

public class RegisterUserServiceImpl implements RegisterUserService {
    private final UserRepository userRepository;

    public RegisterUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) {
        user.setId(UUID.randomUUID());
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return userRepository.save(user);
    }

}

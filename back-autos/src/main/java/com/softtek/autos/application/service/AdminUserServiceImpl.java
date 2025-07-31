package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.Role;
import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.UserRepository;
import com.softtek.autos.infrastructure.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AdminUserServiceImpl implements AdminUserService {
    private final UserRepository userRepository;

    public AdminUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUserRole(UUID userId, Role newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
        user.setRole(newRole);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(UUID userId) {
        userRepository.findById(userId)
                .ifPresentOrElse(
                        user -> userRepository.delete(user.getId()),
                        () -> { throw new NotFoundException("Usuario no encontrado"); }
                );
    }
}

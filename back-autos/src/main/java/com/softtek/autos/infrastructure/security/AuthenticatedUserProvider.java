package com.softtek.autos.infrastructure.security;

import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.UserRepository;
import com.softtek.autos.infrastructure.exception.NotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class AuthenticatedUserProvider {
    private final UserRepository userRepository;

    public AuthenticatedUserProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UUID getUserId() {
        String userIdStr = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return UUID.fromString(userIdStr);
    }

    public User getUser() {
        String userIdStr = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UUID userId = UUID.fromString(userIdStr);

        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("Usuario autenticado no encontrado"));
    }
}

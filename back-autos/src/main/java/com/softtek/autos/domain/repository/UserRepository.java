package com.softtek.autos.domain.repository;

import com.softtek.autos.domain.model.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    Optional<User> findByUsername(String username);

    User save(User user);

    Optional<User> findById(UUID id);
}

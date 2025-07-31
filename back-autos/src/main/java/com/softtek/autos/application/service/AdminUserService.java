package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.Role;
import com.softtek.autos.domain.model.User;

import java.util.List;
import java.util.UUID;

public interface AdminUserService {
    List<User> findAllUsers();
    User updateUserRole(UUID userId, Role newRole);
    void deleteUser(UUID userId);
}

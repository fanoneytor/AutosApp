package com.softtek.autos.infrastructure.persistence.mapper;

import com.softtek.autos.domain.model.User;
import com.softtek.autos.infrastructure.persistence.entity.UserEntity;

public class UserMapper {
    public User toDomain(UserEntity entity) {
        User user = new User();
        user.setId(entity.getId());
        user.setUsername(entity.getUsername());
        user.setPassword(entity.getPassword());
        return user;
    }

    public UserEntity toEntity(User user) {
        UserEntity entity = new UserEntity();
        entity.setId(user.getId());
        entity.setUsername(user.getUsername());
        entity.setPassword(user.getPassword());
        return entity;
    }
}

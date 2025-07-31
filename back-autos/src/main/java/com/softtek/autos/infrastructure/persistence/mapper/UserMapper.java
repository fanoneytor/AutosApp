package com.softtek.autos.infrastructure.persistence.mapper;

import com.softtek.autos.api.dto.RegisterRequest;
import com.softtek.autos.domain.model.User;
import com.softtek.autos.infrastructure.persistence.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
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

    public User toDomain(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.username());
        user.setPassword(registerRequest.password());
        return user;
    }
}

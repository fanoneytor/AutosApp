package com.softtek.autos.infrastructure.persistence.adapter;

import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.UserRepository;
import com.softtek.autos.infrastructure.persistence.entity.UserEntity;
import com.softtek.autos.infrastructure.persistence.mapper.UserMapper;
import com.softtek.autos.infrastructure.persistence.repository.JpaUserRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public class UserRepositoryAdapter implements UserRepository {
    private final JpaUserRepository jpaUserRepository;
    private final UserMapper userMapper;

    public UserRepositoryAdapter(JpaUserRepository jpaUserRepository, UserMapper userMapper) {
        this.jpaUserRepository = jpaUserRepository;
        this.userMapper = userMapper;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return jpaUserRepository.findByUsername(username)
                .map(userMapper::toDomain);
    }

    @Override
    public User save(User user) {
        UserEntity entity = userMapper.toEntity(user);
        return userMapper.toDomain(jpaUserRepository.save(entity));
    }

    @Override
    public Optional<User> findById(UUID id) {
        return jpaUserRepository.findById(id)
                .map(userMapper::toDomain);
    }
}

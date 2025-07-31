package com.softtek.autos.infrastructure.persistence.repository;

import com.softtek.autos.infrastructure.persistence.entity.CarEntity;
import com.softtek.autos.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaCarRepository extends JpaRepository<CarEntity, UUID> {
    List<CarEntity> findByUser(UserEntity user);
    Optional<CarEntity> findByIdAndUser(UUID carId, UserEntity user);
}

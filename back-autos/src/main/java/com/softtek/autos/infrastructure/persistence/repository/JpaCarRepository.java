package com.softtek.autos.infrastructure.persistence.repository;

import com.softtek.autos.infrastructure.persistence.entity.CarEntity;
import com.softtek.autos.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaCarRepository extends JpaRepository<CarEntity, UUID> {
    List<CarEntity> findByUser(UserEntity user);
    Optional<CarEntity> findByIdAndUser(UUID carId, UserEntity user);

    @Query("SELECT c FROM CarEntity c WHERE c.user = :user AND (LOWER(c.plate) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.model) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<CarEntity> searchByUserAndQuery(@Param("user") UserEntity user, @Param("query") String query);
}

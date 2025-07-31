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

    @Query("SELECT c FROM CarEntity c WHERE c.user = :user AND (LOWER(c.plate) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.model) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.brand) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(CAST(c.year AS string)) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.color) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<CarEntity> searchByUserAndQuery(@Param("user") UserEntity user, @Param("query") String query);

    @Query("SELECT c FROM CarEntity c WHERE c.user = :user " +
            "AND (:brand IS NULL OR LOWER(c.brand) LIKE LOWER(CONCAT('%', :brand, '%'))) " +
            "AND (:model IS NULL OR LOWER(c.model) LIKE LOWER(CONCAT('%', :model, '%'))) " +
            "AND (:year IS NULL OR c.year = :year) " +
            "AND (:plate IS NULL OR LOWER(c.plate) LIKE LOWER(CONCAT('%', :plate, '%'))) " +
            "AND (:color IS NULL OR LOWER(c.color) LIKE LOWER(CONCAT('%', :color, '%')))")
    List<CarEntity> filterCars(@Param("user") UserEntity user,
                               @Param("brand") String brand,
                               @Param("model") String model,
                               @Param("year") Integer year,
                               @Param("plate") String plate,
                               @Param("color") String color);
}

package com.softtek.autos.domain.repository;

import com.softtek.autos.domain.model.Car;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarRepository {
    Car save(Car car);

    List<Car> findByUserId(UUID userId);

    List<Car> searchByUserIdAndQuery(UUID userId, String query);

    List<Car> filterCars(UUID userId, String brand, String model, Integer year, String plate, String color);

    Optional<Car> findById(UUID carId);

    Optional<Car> findByIdAndUserId(UUID carId, UUID userId);

    void delete(UUID carId);
}

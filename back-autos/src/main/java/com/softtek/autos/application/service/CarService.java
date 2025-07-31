package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.Car;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarService {
    Car create(Car car);

    List<Car> findAllByUserId(UUID userId);

    List<Car> searchByUserIdAndQuery(UUID userId, String query);

    List<Car> filterCars(UUID userId, String brand, String model, Integer year, String plate, String color);

    Optional<Car> findById(UUID id);

    Car update(Car car, UUID userId);

    void delete(UUID id, UUID userId);
}


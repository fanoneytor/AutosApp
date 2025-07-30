package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.Car;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarService {
    Car create(Car car);

    List<Car> findAllByUserId(UUID userId);

    Optional<Car> findById(UUID id);

    Car update(Car car);

    void delete(UUID id);
}

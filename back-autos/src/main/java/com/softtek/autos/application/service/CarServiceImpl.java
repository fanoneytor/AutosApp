package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.Car;
import com.softtek.autos.domain.repository.CarRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;

    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public Car create(Car car) {
        car.setId(UUID.randomUUID());
        return carRepository.save(car);
    }

    @Override
    public List<Car> findAllByUserId(UUID userId) {
        return carRepository.findByUserId(userId);
    }

    @Override
    public Optional<Car> findById(UUID id) {
        return carRepository.findById(id);
    }

    @Override
    public Car update(Car car, UUID userId) {
        return carRepository.save(car);
    }

    @Override
    public void delete(UUID id, UUID userId) {
        carRepository.delete(id);
    }
}

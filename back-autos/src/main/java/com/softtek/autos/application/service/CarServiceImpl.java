package com.softtek.autos.application.service;

import com.softtek.autos.domain.model.Car;
import com.softtek.autos.domain.repository.CarRepository;
import com.softtek.autos.infrastructure.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
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
    public List<Car> searchByUserIdAndQuery(UUID userId, String query) {
        return carRepository.searchByUserIdAndQuery(userId, query);
    }

    @Override
    public Optional<Car> findById(UUID id) {
        return carRepository.findById(id);
    }

    @Override
    public Car update(Car car, UUID userId) {
        return carRepository.findByIdAndUserId(car.getId(), userId)
                .map(existingCar -> carRepository.save(car))
                .orElseThrow(() -> new NotFoundException("Car not found or does not belong to the user"));
    }

    @Override
    public void delete(UUID id, UUID userId) {
        carRepository.findByIdAndUserId(id, userId)
                .ifPresentOrElse(
                        car -> carRepository.delete(id),
                        () -> {
                            throw new NotFoundException("Car not found or does not belong to the user");
                        }
                );
    }
}

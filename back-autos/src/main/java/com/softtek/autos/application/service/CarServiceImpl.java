package com.softtek.autos.application.service;

import com.softtek.autos.api.dto.CarDto;
import com.softtek.autos.api.dto.CarQueryFilters;
import com.softtek.autos.api.mapper.CarDtoMapper;
import com.softtek.autos.domain.model.Car;
import com.softtek.autos.domain.repository.CarRepository;
import com.softtek.autos.infrastructure.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;

    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public CarDto create(CarDto carDto, UUID userId) {
        Car car = CarDtoMapper.toDomain(carDto, userId);
        car.setId(UUID.randomUUID());
        Car savedCar = carRepository.save(car);
        return CarDtoMapper.toDto(savedCar);
    }

    @Override
    public List<CarDto> findCars(UUID userId, CarQueryFilters filters) {
        List<Car> cars;
        boolean hasGeneralQuery = filters.getQuery() != null && !filters.getQuery().isEmpty();
        boolean hasIndividualFilters = filters.getBrand() != null || filters.getModel() != null || filters.getYear() != null || filters.getPlate() != null || filters.getColor() != null;

        if (hasGeneralQuery) {
            cars = carRepository.searchByUserIdAndQuery(userId, filters.getQuery());
        } else if (hasIndividualFilters) {
            cars = carRepository.filterCars(userId, filters.getBrand(), filters.getModel(), filters.getYear(), filters.getPlate(), filters.getColor());
        } else {
            cars = carRepository.findByUserId(userId);
        }

        return cars.stream()
                .map(CarDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CarDto> findById(UUID id) {
        return carRepository.findById(id).map(CarDtoMapper::toDto);
    }

    @Override
    public CarDto update(UUID id, CarDto carDto, UUID userId) {
        return carRepository.findByIdAndUserId(id, userId)
                .map(existingCar -> {
                    Car carToUpdate = CarDtoMapper.toDomain(carDto, userId);
                    carToUpdate.setId(id);
                    Car updatedCar = carRepository.save(carToUpdate);
                    return CarDtoMapper.toDto(updatedCar);
                })
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

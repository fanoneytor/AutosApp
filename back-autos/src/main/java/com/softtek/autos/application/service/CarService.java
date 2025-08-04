package com.softtek.autos.application.service;

import com.softtek.autos.api.dto.CarDto;
import com.softtek.autos.api.dto.CarQueryFilters;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CarService {
    CarDto create(CarDto carDto, UUID userId);

    List<CarDto> findCars(UUID userId, CarQueryFilters filters);

    Optional<CarDto> findById(UUID id);

    CarDto update(UUID id, CarDto carDto, UUID userId);

    void delete(UUID id, UUID userId);
}


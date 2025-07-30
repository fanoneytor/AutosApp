package com.softtek.autos.api.controller;

import com.softtek.autos.api.dto.CarDto;
import com.softtek.autos.api.mapper.CarDtoMapper;
import com.softtek.autos.application.service.CarService;
import com.softtek.autos.domain.model.Car;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping
    public ResponseEntity<CarDto> create(@RequestBody CarDto dto, @RequestHeader("user-id") UUID userId) {
        Car car = CarDtoMapper.toDomain(dto, userId);
        Car saved = carService.create(car);
        return ResponseEntity.ok(CarDtoMapper.toDto(saved));
    }

    @GetMapping
    public ResponseEntity<List<CarDto>> list(@RequestHeader("user-id") UUID userId) {
        return ResponseEntity.ok(
                carService.findAllByUserId(userId)
                        .stream()
                        .map(CarDtoMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDto> update(@PathVariable UUID id, @RequestBody CarDto dto, @RequestHeader("user-id") UUID userId) {
        Car car = CarDtoMapper.toDomain(dto, userId);
        car.setId(id);
        return ResponseEntity.ok(CarDtoMapper.toDto(carService.update(car)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        carService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

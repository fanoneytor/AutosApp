package com.softtek.autos.api.controller;

import com.softtek.autos.api.dto.CarDto;
import com.softtek.autos.api.mapper.CarDtoMapper;
import com.softtek.autos.application.service.CarService;
import com.softtek.autos.domain.model.Car;
import com.softtek.autos.infrastructure.security.AuthenticatedUserProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarService carService;
    private final AuthenticatedUserProvider authUser;

    public CarController(CarService carService, AuthenticatedUserProvider authUser) {
        this.carService = carService;
        this.authUser = authUser;
    }

    @PostMapping
    public ResponseEntity<CarDto> create(@RequestBody CarDto dto) {
        Car car = CarDtoMapper.toDomain(dto, authUser.getUserId());
        return ResponseEntity.ok(CarDtoMapper.toDto(carService.create(car)));
    }

    @GetMapping
    public ResponseEntity<List<CarDto>> list(@RequestParam(required = false) String query) {
        List<Car> cars;
        if (query != null && !query.isEmpty()) {
            cars = carService.searchByUserIdAndQuery(authUser.getUserId(), query);
        } else {
            cars = carService.findAllByUserId(authUser.getUserId());
        }
        return ResponseEntity.ok(
                cars.stream()
                        .map(CarDtoMapper::toDto)
                        .collect(Collectors.toList())
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDto> update(@PathVariable UUID id, @RequestBody CarDto dto) {
        Car car = CarDtoMapper.toDomain(dto, authUser.getUserId());
        car.setId(id);
        return ResponseEntity.ok(CarDtoMapper.toDto(carService.update(car, authUser.getUserId())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        carService.delete(id, authUser.getUserId());
        return ResponseEntity.noContent().build();
    }
}

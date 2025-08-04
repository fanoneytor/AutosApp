package com.softtek.autos.api.controller;

import com.softtek.autos.api.dto.CarDto;
import com.softtek.autos.api.dto.CarQueryFilters;
import com.softtek.autos.application.service.CarService;
import com.softtek.autos.infrastructure.security.AuthenticatedUserProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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
        return ResponseEntity.ok(carService.create(dto, authUser.getUserId()));
    }

    @GetMapping
    public ResponseEntity<List<CarDto>> list(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String plate,
            @RequestParam(required = false) String color
    ) {
        CarQueryFilters filters = CarQueryFilters.builder()
                .query(query)
                .brand(brand)
                .model(model)
                .year(year)
                .plate(plate)
                .color(color)
                .build();

        return ResponseEntity.ok(carService.findCars(authUser.getUserId(), filters));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDto> update(@PathVariable UUID id, @RequestBody CarDto dto) {
        return ResponseEntity.ok(carService.update(id, dto, authUser.getUserId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        carService.delete(id, authUser.getUserId());
        return ResponseEntity.noContent().build();
    }
}
package com.softtek.autos.infrastructure.persistence.mapper;

import com.softtek.autos.domain.model.Car;
import com.softtek.autos.infrastructure.persistence.entity.CarEntity;
import com.softtek.autos.infrastructure.persistence.repository.JpaUserRepository;
import org.springframework.stereotype.Component;

@Component
public class CarMapper {
    public Car toDomain(CarEntity entity) {
        Car car = new Car();
        car.setId(entity.getId());
        car.setBrand(entity.getBrand());
        car.setModel(entity.getModel());
        car.setYear(entity.getYear());
        car.setPlate(entity.getPlate());
        car.setColor(entity.getColor());
        car.setImageUrl(entity.getImageUrl());
        car.setUserId(entity.getUser().getId());
        return car;
    }

    public CarEntity toEntity(Car car, JpaUserRepository userRepo) {
        CarEntity entity = new CarEntity();
        entity.setId(car.getId());
        entity.setBrand(car.getBrand());
        entity.setModel(car.getModel());
        entity.setYear(car.getYear());
        entity.setPlate(car.getPlate());
        entity.setColor(car.getColor());
        entity.setImageUrl(car.getImageUrl());
        entity.setUser(userRepo.findById(car.getUserId()).orElseThrow());
        return entity;
    }
}

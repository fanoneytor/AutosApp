package com.softtek.autos.api.mapper;

import com.softtek.autos.api.dto.CarDto;
import com.softtek.autos.domain.model.Car;

public class CarDtoMapper {
    public static CarDto toDto(Car car) {
        return new CarDto(
                car.getId(),
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getPlate(),
                car.getColor(),
                car.getImageUrl()
        );
    }

    public static Car toDomain(CarDto dto, java.util.UUID userId) {
        Car car = new Car();
        car.setId(dto.id());
        car.setBrand(dto.brand());
        car.setModel(dto.model());
        car.setYear(dto.year());
        car.setPlate(dto.plate());
        car.setColor(dto.color());
        car.setImageUrl(dto.imageUrl());
        car.setUserId(userId);
        return car;
    }
}

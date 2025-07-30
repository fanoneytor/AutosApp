package com.softtek.autos.domain.model;

import lombok.Data;

import java.util.UUID;

@Data
public class Car {
    private UUID id;
    private String brand;
    private String model;
    private int year;
    private String plate;
    private String color;
    private UUID userId;
}

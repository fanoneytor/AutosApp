package com.softtek.autos.api.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CarQueryFilters {
    private String query;
    private String brand;
    private String model;
    private Integer year;
    private String plate;
    private String color;
}
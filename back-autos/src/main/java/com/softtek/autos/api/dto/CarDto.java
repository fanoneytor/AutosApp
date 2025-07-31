package com.softtek.autos.api.dto;

import java.util.UUID;

public record CarDto(
        UUID id,
        String brand,
        String model,
        int year,
        String plate,
        String color,
        String imageUrl
) {
}

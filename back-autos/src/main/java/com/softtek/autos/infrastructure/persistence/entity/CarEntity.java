package com.softtek.autos.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
@Table(name = "cars")
public class CarEntity {
    @Id
    private UUID id;

    private String brand;
    private String model;
    private int year;
    private String plate;
    private String color;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}

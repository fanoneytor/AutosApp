package com.softtek.autos.domain.model;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class User {
    private UUID id;
    private String username;
    private String password;
    private List<Car> cars;
}

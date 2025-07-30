package com.softtek.autos.infrastructure.persistence.adapter;

import com.softtek.autos.domain.model.Car;
import com.softtek.autos.domain.repository.CarRepository;
import com.softtek.autos.infrastructure.persistence.entity.CarEntity;
import com.softtek.autos.infrastructure.persistence.mapper.CarMapper;
import com.softtek.autos.infrastructure.persistence.repository.JpaCarRepository;
import com.softtek.autos.infrastructure.persistence.repository.JpaUserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

public class CarRepositoryAdapter implements CarRepository {
    private final JpaCarRepository jpaCarRepository;
    private final JpaUserRepository jpaUserRepository;
    private final CarMapper carMapper;

    public CarRepositoryAdapter(JpaCarRepository jpaCarRepository,
                                JpaUserRepository jpaUserRepository,
                                CarMapper carMapper) {
        this.jpaCarRepository = jpaCarRepository;
        this.jpaUserRepository = jpaUserRepository;
        this.carMapper = carMapper;
    }

    @Override
    public Car save(Car car) {
        CarEntity entity = carMapper.toEntity(car, jpaUserRepository);
        return carMapper.toDomain(jpaCarRepository.save(entity));
    }

    @Override
    public List<Car> findByUserId(UUID userId) {
        return jpaUserRepository.findById(userId)
                .map(jpaCarRepository::findByUser)
                .orElse(List.of())
                .stream()
                .map(carMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Car> findById(UUID carId) {
        return jpaCarRepository.findById(carId)
                .map(carMapper::toDomain);
    }

    @Override
    public void delete(UUID id) {
        jpaCarRepository.deleteById(id);
    }
}

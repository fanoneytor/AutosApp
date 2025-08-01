package com.softtek.autos.infrastructure.persistence.adapter;

import com.softtek.autos.domain.model.Car;
import com.softtek.autos.domain.repository.CarRepository;
import com.softtek.autos.infrastructure.persistence.entity.CarEntity;
import com.softtek.autos.infrastructure.persistence.mapper.CarMapper;
import com.softtek.autos.infrastructure.persistence.repository.JpaCarRepository;
import com.softtek.autos.infrastructure.persistence.repository.JpaUserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
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
    public List<Car> searchByUserIdAndQuery(UUID userId, String query) {
        return jpaUserRepository.findById(userId)
                .map(userEntity -> jpaCarRepository.searchByUserAndQuery(userEntity, query))
                .orElse(List.of())
                .stream()
                .map(carMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Car> filterCars(UUID userId, String brand, String model, Integer year, String plate, String color) {
        return jpaUserRepository.findById(userId)
                .map(userEntity -> jpaCarRepository.filterCars(userEntity, brand, model, year, plate, color))
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
    public Optional<Car> findByIdAndUserId(UUID carId, UUID userId) {
        return jpaUserRepository.findById(userId)
                .flatMap(userEntity -> jpaCarRepository.findByIdAndUser(carId, userEntity))
                .map(carMapper::toDomain);
    }

    @Override
    public void delete(UUID id) {
        jpaCarRepository.deleteById(id);
    }
}

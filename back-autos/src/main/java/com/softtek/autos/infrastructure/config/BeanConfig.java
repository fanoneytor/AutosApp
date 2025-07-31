package com.softtek.autos.infrastructure.config;

import com.softtek.autos.application.service.CarService;
import com.softtek.autos.application.service.CarServiceImpl;
import com.softtek.autos.application.service.RegisterUserService;
import com.softtek.autos.application.service.RegisterUserServiceImpl;
import com.softtek.autos.domain.repository.CarRepository;
import com.softtek.autos.domain.repository.UserRepository;
import com.softtek.autos.infrastructure.persistence.adapter.CarRepositoryAdapter;
import com.softtek.autos.infrastructure.persistence.adapter.UserRepositoryAdapter;
import com.softtek.autos.infrastructure.persistence.mapper.CarMapper;
import com.softtek.autos.infrastructure.persistence.mapper.UserMapper;
import com.softtek.autos.infrastructure.persistence.repository.JpaCarRepository;
import com.softtek.autos.infrastructure.persistence.repository.JpaUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeanConfig {
    @Bean
    public UserMapper userMapper() {
        return new UserMapper();
    }

    @Bean
    public CarMapper carMapper() {
        return new CarMapper();
    }

    @Bean
    public UserRepository userRepository(JpaUserRepository jpaUserRepository, UserMapper userMapper) {
        return new UserRepositoryAdapter(jpaUserRepository, userMapper);
    }

    @Bean
    public CarRepository carRepository(JpaCarRepository jpaCarRepository, JpaUserRepository jpaUserRepository, CarMapper carMapper) {
        return new CarRepositoryAdapter(jpaCarRepository, jpaUserRepository, carMapper);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RegisterUserService registerUserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        return new RegisterUserServiceImpl(userRepository, passwordEncoder, userMapper);
    }

    @Bean
    public CarService carService(CarRepository carRepository) {
        return new CarServiceImpl(carRepository);
    }
}

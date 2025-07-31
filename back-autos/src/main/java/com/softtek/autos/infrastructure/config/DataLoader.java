package com.softtek.autos.infrastructure.config;

import com.softtek.autos.domain.model.Car;
import com.softtek.autos.domain.model.Role;
import com.softtek.autos.domain.model.User;
import com.softtek.autos.domain.repository.CarRepository;
import com.softtek.autos.domain.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, CarRepository carRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create Admin User
        if (userRepository.findByUsername("admin").isEmpty()) {
            User adminUser = new User();
            adminUser.setId(UUID.randomUUID());
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("adminpass"));
            adminUser.setRole(Role.ADMIN);
            userRepository.save(adminUser);

            // Add some cars for admin
            Car car1 = new Car();
            car1.setId(UUID.randomUUID());
            car1.setBrand("Toyota");
            car1.setModel("Corolla");
            car1.setYear(2020);
            car1.setPlate("ABC-123");
            car1.setColor("Rojo");
            car1.setImageUrl("https://www.toyota.com/img/vehicles/2020/corolla/gallery/exterior/color/040.png");
            car1.setUserId(adminUser.getId());
            carRepository.save(car1);

            Car car2 = new Car();
            car2.setId(UUID.randomUUID());
            car2.setBrand("Honda");
            car2.setModel("Civic");
            car2.setYear(2018);
            car2.setPlate("DEF-456");
            car2.setColor("Azul");
            car2.setImageUrl("https://www.honda.com/img/vehicles/2018/civic/gallery/exterior/color/B588P.png");
            car2.setUserId(adminUser.getId());
            carRepository.save(car2);
        }

        // Create Regular User
        if (userRepository.findByUsername("user").isEmpty()) {
            User regularUser = new User();
            regularUser.setId(UUID.randomUUID());
            regularUser.setUsername("user");
            regularUser.setPassword(passwordEncoder.encode("userpass"));
            regularUser.setRole(Role.USER);
            userRepository.save(regularUser);

            // Add some cars for regular user
            Car car3 = new Car();
            car3.setId(UUID.randomUUID());
            car3.setBrand("Ford");
            car3.setModel("Focus");
            car3.setYear(2022);
            car3.setPlate("GHI-789");
            car3.setColor("Negro");
            car3.setImageUrl("https://www.ford.com/img/vehicles/2022/focus/gallery/exterior/color/black.png");
            car3.setUserId(regularUser.getId());
            carRepository.save(car3);
        }
    }
}

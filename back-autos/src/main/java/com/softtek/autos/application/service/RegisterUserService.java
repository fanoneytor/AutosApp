package com.softtek.autos.application.service;

import com.softtek.autos.api.dto.RegisterRequest;
import com.softtek.autos.domain.model.User;

public interface RegisterUserService {
    User register(RegisterRequest registerRequest);
}

package com.softtek.autos.infrastructure.security;

import java.util.UUID;

public class AuthUser {
    private static final ThreadLocal<UUID> currentUser = new ThreadLocal<>();

    public static void setUserId(UUID userId) {
        currentUser.set(userId);
    }

    public static UUID getUserId() {
        return currentUser.get();
    }

    public static void clear() {
        currentUser.remove();
    }
}

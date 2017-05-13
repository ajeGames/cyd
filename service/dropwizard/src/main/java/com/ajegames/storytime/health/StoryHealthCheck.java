package com.ajegames.storytime.health;

import com.codahale.metrics.health.HealthCheck;

/**
 * Bare-bones health check.
 */
public class StoryHealthCheck extends HealthCheck {

    @Override
    protected Result check() throws Exception {
        return Result.healthy();
    }
}

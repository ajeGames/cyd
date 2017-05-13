package com.ajegames.storytime;

import io.dropwizard.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;

/**
 * This is for environment-specific parameters.
 */
public class StoryTimeConfiguration extends Configuration {

    @Valid
    private PersistenceConfiguration persistence;

    public PersistenceConfiguration getPersistence() {
        return persistence;
    }

}

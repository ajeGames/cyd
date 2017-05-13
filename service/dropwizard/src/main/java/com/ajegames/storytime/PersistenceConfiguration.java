package com.ajegames.storytime;

import javax.validation.constraints.NotNull;

public class PersistenceConfiguration {

    @NotNull
    private String path;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}

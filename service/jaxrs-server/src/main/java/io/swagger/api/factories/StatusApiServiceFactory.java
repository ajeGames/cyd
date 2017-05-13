package io.swagger.api.factories;

import io.swagger.api.StatusApiService;
import io.swagger.api.impl.StatusApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public class StatusApiServiceFactory {
    private final static StatusApiService service = new StatusApiServiceImpl();

    public static StatusApiService getStatusApi() {
        return service;
    }
}

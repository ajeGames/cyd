package io.swagger.api.factories;

import io.swagger.api.FeaturedStoriesApiService;
import io.swagger.api.impl.FeaturedStoriesApiServiceImpl;

@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public class FeaturedStoriesApiServiceFactory {
    private final static FeaturedStoriesApiService service = new FeaturedStoriesApiServiceImpl();

    public static FeaturedStoriesApiService getFeaturedStoriesApi() {
        return service;
    }
}

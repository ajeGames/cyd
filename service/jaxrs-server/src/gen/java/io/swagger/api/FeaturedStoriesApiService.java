package io.swagger.api;

import io.swagger.api.*;
import io.swagger.model.*;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import io.swagger.model.Error;
import io.swagger.model.FeaturedStoryUpdate;
import io.swagger.model.StorySummary;

import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public abstract class FeaturedStoriesApiService {
    public abstract Response clearFeaturedStories(SecurityContext securityContext) throws NotFoundException;
    public abstract Response getFeaturedStories(SecurityContext securityContext) throws NotFoundException;
    public abstract Response updateFeaturedStories(FeaturedStoryUpdate toAddRemove,SecurityContext securityContext) throws NotFoundException;
}

package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.StatusApiService;
import io.swagger.api.factories.StatusApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

import io.swagger.model.Status;

import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.*;
import javax.validation.constraints.*;

@Path("/status")


@io.swagger.annotations.Api(description = "the status API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public class StatusApi  {
   private final StatusApiService delegate = StatusApiServiceFactory.getStatusApi();

    @GET
    
    
    
    @io.swagger.annotations.ApiOperation(value = "", notes = "Gets information about the status of the StoryTime service.", response = Status.class, tags={ "admin", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Successful response", response = Status.class) })
    public Response getStatus(@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getStatus(securityContext);
    }
}

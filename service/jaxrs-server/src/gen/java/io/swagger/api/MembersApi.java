package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.MembersApiService;
import io.swagger.api.factories.MembersApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

import io.swagger.model.Error;
import io.swagger.model.Member;

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

@Path("/members")


@io.swagger.annotations.Api(description = "the members API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public class MembersApi  {
   private final MembersApiService delegate = MembersApiServiceFactory.getMembersApi();

    @GET
    @Path("/{memberId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "Gets member information", notes = "Gets public member information", response = Member.class, tags={ "clubhouse", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Member found", response = Member.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Member not found", response = Member.class) })
    public Response getMember(@ApiParam(value = "ID of the member",required=true) @PathParam("memberId") String memberId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getMember(memberId,securityContext);
    }
    @POST
    
    
    
    @io.swagger.annotations.ApiOperation(value = "Creates a new member of the Clubhouse.", notes = "", response = Member.class, tags={ "clubhouse", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 201, message = "Member registered", response = Member.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Registration failure", response = Member.class) })
    public Response registerMember(@ApiParam(value = "Member information" ,required=true) Member member
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.registerMember(member,securityContext);
    }
}

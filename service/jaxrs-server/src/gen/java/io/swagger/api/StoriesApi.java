package io.swagger.api;

import io.swagger.model.*;
import io.swagger.api.StoriesApiService;
import io.swagger.api.factories.StoriesApiServiceFactory;

import io.swagger.annotations.ApiParam;
import io.swagger.jaxrs.*;

import io.swagger.model.Chapter;
import io.swagger.model.Error;
import io.swagger.model.StorySummary;

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

@Path("/stories")


@io.swagger.annotations.Api(description = "the stories API")
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public class StoriesApi  {
   private final StoriesApiService delegate = StoriesApiServiceFactory.getStoriesApi();

    @POST
    @Path("/{storyKey}/chapters")
    
    
    @io.swagger.annotations.ApiOperation(value = "Creates new chapter with given information.", notes = "Creates a chapter with the information provided, assigning a chapter ID.", response = Chapter.class, tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 201, message = "Chapter created", response = Chapter.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid input", response = Chapter.class) })
    public Response createChapter(@ApiParam(value = "key of story to add chapter to",required=true) @PathParam("storyKey") String storyKey
,@ApiParam(value = "Chapter information" ,required=true) Chapter chapter
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.createChapter(storyKey,chapter,securityContext);
    }
    @POST
    
    
    
    @io.swagger.annotations.ApiOperation(value = "Creates new story with given information.", notes = "Creates a story with the information provided, assigning a unique key.", response = StorySummary.class, tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 201, message = "Story created", response = StorySummary.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid input", response = StorySummary.class) })
    public Response createStory(@ApiParam(value = "Story summary" ,required=true) StorySummary story
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.createStory(story,securityContext);
    }
    @GET
    @Path("/{storyKey}/chapters/{chapterId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "Retrieves chapter with given ID of story with given key.", notes = "Retrieves chapter with given ID of story with given key.", response = Chapter.class, tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Chapter found", response = Chapter.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Chapter not found", response = Chapter.class) })
    public Response getChapter(@ApiParam(value = "unique key of story to retrieve",required=true) @PathParam("storyKey") String storyKey
,@ApiParam(value = "chapter ID",required=true) @PathParam("chapterId") Integer chapterId
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getChapter(storyKey,chapterId,securityContext);
    }
    @GET
    @Path("/{storyKey}/chapters")
    
    
    @io.swagger.annotations.ApiOperation(value = "Gets all of the chapter of given story", notes = "Gets every chapter of given story.", response = Chapter.class, responseContainer = "List", tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Chapter details", response = Chapter.class, responseContainer = "List") })
    public Response getChapters(@ApiParam(value = "key of story to add chapter to",required=true) @PathParam("storyKey") String storyKey
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getChapters(storyKey,securityContext);
    }
    @GET
    
    
    
    @io.swagger.annotations.ApiOperation(value = "Gets all of the story summaries", notes = "Gets every story summary. Results might be truncated for paging.", response = StorySummary.class, responseContainer = "List", tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Story summaries", response = StorySummary.class, responseContainer = "List") })
    public Response getStorySummaries(@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getStorySummaries(securityContext);
    }
    @GET
    @Path("/{storyKey}")
    
    
    @io.swagger.annotations.ApiOperation(value = "Returns story summary for given key", notes = "Returns the summary of the story indentified by key.", response = StorySummary.class, tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Story found", response = StorySummary.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Story not found", response = StorySummary.class) })
    public Response getStorySummary(@ApiParam(value = "unique key of story to retrieve",required=true) @PathParam("storyKey") String storyKey
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.getStorySummary(storyKey,securityContext);
    }
    @PATCH
    @Path("/{storyKey}/chapters/{chapterId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "Replaces a portion of the chapter", notes = "Replaces a portion of the chapter -- the prose, the signpost, etc. without touching the rest", response = Chapter.class, tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 202, message = "Chapter patched", response = Chapter.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid input", response = Chapter.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Story or chapter not found", response = Chapter.class) })
    public Response patchChapter(@ApiParam(value = "unique key of story to update",required=true) @PathParam("storyKey") String storyKey
,@ApiParam(value = "chapter ID",required=true) @PathParam("chapterId") Integer chapterId
,@ApiParam(value = "Chapter information" ,required=true) Chapter chapter
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.patchChapter(storyKey,chapterId,chapter,securityContext);
    }
    @PUT
    @Path("/{storyKey}/chapters/{chapterId}")
    
    
    @io.swagger.annotations.ApiOperation(value = "Updates chapter with given information.", notes = "Updates the given chapter of given story.", response = Chapter.class, tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 202, message = "Chapter updated", response = Chapter.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid input", response = Chapter.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Story or chapter not found", response = Chapter.class) })
    public Response updateChapter(@ApiParam(value = "unique key of story to update",required=true) @PathParam("storyKey") String storyKey
,@ApiParam(value = "chapter ID",required=true) @PathParam("chapterId") Integer chapterId
,@ApiParam(value = "Chapter information" ,required=true) Chapter chapter
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.updateChapter(storyKey,chapterId,chapter,securityContext);
    }
    @PUT
    @Path("/{storyKey}")
    
    
    @io.swagger.annotations.ApiOperation(value = "Updates a story summary with given information.", notes = "Creates a story with the information provided, assigning a unique key.", response = StorySummary.class, tags={ "storytime", })
    @io.swagger.annotations.ApiResponses(value = { 
        @io.swagger.annotations.ApiResponse(code = 200, message = "Story summary updated", response = StorySummary.class),
        
        @io.swagger.annotations.ApiResponse(code = 400, message = "Invalid input", response = StorySummary.class),
        
        @io.swagger.annotations.ApiResponse(code = 404, message = "Story not found", response = StorySummary.class) })
    public Response updateStorySummary(@ApiParam(value = "unique key of story to update",required=true) @PathParam("storyKey") String storyKey
,@ApiParam(value = "Story summary" ,required=true) StorySummary story
,@Context SecurityContext securityContext)
    throws NotFoundException {
        return delegate.updateStorySummary(storyKey,story,securityContext);
    }
}

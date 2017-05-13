package com.ajegames.storytime.resource;

import com.ajegames.storytime.StoryTimeApplication;
import com.ajegames.storytime.model.Story;
import com.ajegames.storytime.model.StorySummary;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/stories")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StoryResource {

    private static Logger LOG = StoryTimeApplication.KEY_EVENT_LOG;

    private StoryController ctrl = StoryController.create();

    /**
     * Provide summary information for all published stories in the catalog.
     *
     * @return java.util.List containing search results
     */
    @GET
    @Timed
    public List<StorySummary> findPublishedStories() {
        /*
         * TODO: introduce criteria to refine search
         */
        LOG.info("Called findPublishedStories");
        return CatalogController.create().getAllStorySummaries();
    }

    @POST
    public StorySummary createStory(StorySummary summary) {
        LOG.info("Creating another story for a happier universe.");
        try {
            return ctrl.createStory(summary);
        } catch (Exception e) {
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @GET
    @Path("{key}")
    public StorySummary getStorySummary(@PathParam("key") String key) {
        LOG.info("Retrieving story for key: " + key);
        Story story = ctrl.getStory(key);
        if (story == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return story.getSummary();
    }

    // not supported at this time; would be a nice administrative method for cloning stories
    // between repos.

//    @GET
//    @Path("{key}/full")
//    public Story getFullStory(@PathParam("key") String key) {
//        LOG.info("Retrieving story for key: " + key);
//        Story story = ctrl.getStory(key);
//        if (story == null) {
//            throw new WebApplicationException(Response.Status.NOT_FOUND);
//        }
//        return story;
//    }

    @PUT
    @Path("{key}")
    public StorySummary updateStory(@PathParam("key") String key, StorySummary update) {
        LOG.info("Receiving changes to story: " + key);
        if (update.getStoryKey() != null && !key.equals(update.getStoryKey())) {
            LOG.error("Key in URI does not match key in data");
            throw new WebApplicationException(Response.Status.BAD_REQUEST);
        }
        try {
            ctrl.updateSummary(update);
            return ctrl.getStory(update.getStoryKey()).getSummary();
        } catch (Exception e) {
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @DELETE
    @Path("{key}")
    public void destroyStory(@PathParam("key") String key) {
        LOG.info("Eliminating entire story: " + key);
        try {
            ctrl.deleteStory(key);
        } catch (Exception e) {
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

}

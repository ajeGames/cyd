package com.ajegames.storytime.resource;

import com.ajegames.storytime.StoryTimeApplication;
import com.ajegames.storytime.model.Status;
import org.slf4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("/catalog")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StoryTimeResource {

    /*
        TODO only allow admin
        TODO: consider security and protections against hackers; e.g., how to handle DDOS attacks
     */

    private static Logger LOG = StoryTimeApplication.KEY_EVENT_LOG;

    @GET
    @Path("status")
    public Status status() {
        LOG.info("Called GET status");
        return Status.create("Greetings, Earthling.", "All systems are go!",
                "v0.3.0");
    }

    @GET
    @Path("featuredStories")
    public List<String> getFeaturedStories() {
        LOG.info("Called GET featuredStories");  // TODO log URL string
        ArrayList<String> fakeStoryIds = new ArrayList<String>();
        fakeStoryIds.add("ABC123");
        fakeStoryIds.add("DEF456");
        return fakeStoryIds;
    }

    @PUT
    @Path("featuredStories")
    public List<String> updateFeaturedStories(List<String> toAdd, List<String> toRemove) {
        LOG.info("Called PUT featuredStories");
        return new ArrayList<String>();
    }

    @DELETE
    @Path("featuredStories")
    public void clearFeaturedStories() {
        LOG.info("Called DELETE featuredStories");
    }
}

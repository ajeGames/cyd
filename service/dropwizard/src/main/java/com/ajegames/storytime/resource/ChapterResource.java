package com.ajegames.storytime.resource;

import com.ajegames.storytime.StoryTimeApplication;
import com.ajegames.storytime.model.Chapter;
import org.slf4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/story/{key}/chapter")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChapterResource {

    private static Logger LOG = StoryTimeApplication.KEY_EVENT_LOG;

    private StoryController ctrl = StoryController.create();

    @GET
    @Path("{id}")
    public Chapter get(@PathParam("key") String key, @PathParam("id") Integer id) {
        LOG.info("Retrieving chapter " + id + " for story " + key);
        Chapter chapter = ctrl.getChapter(key, id);
        if (chapter == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return chapter;
    }

    @PUT
    @Path("{id}")
    public Chapter update(@PathParam("key") String key, @PathParam("id") Integer id, Chapter update) {
        LOG.info("Receiving changes to story: " + key);
        if (key == null || update.getChapterId() == null || !id.equals(update.getChapterId())) {
            throw new WebApplicationException(Response.Status.BAD_REQUEST);
        }
        try {
            ctrl.updateChapter(key, update);
            return ctrl.getChapter(key, update.getChapterId());
        } catch (Exception e) {
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @POST
    @Path("{id}")
    public Chapter addChapterOption(@PathParam("key") String key, @PathParam("id") Integer fromChapterId,
                                    String teaser) {
        LOG.info("Adding next chapter");
        try {
            return ctrl.addNextChapter(key, fromChapterId, teaser);
        } catch (Exception e) {
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

    @DELETE
    @Path("{id}")
    public void destroy(@PathParam("key") String key, @PathParam("id") Integer chapterId) {
        LOG.info("Removing chapter");
        try {
            ctrl.deleteChapter(key, chapterId);
        } catch (Exception e) {
            throw new WebApplicationException(e, Response.Status.INTERNAL_SERVER_ERROR);
        }
    }

}

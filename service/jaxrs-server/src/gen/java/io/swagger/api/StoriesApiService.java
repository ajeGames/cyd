package io.swagger.api;

import io.swagger.api.*;
import io.swagger.model.*;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

import io.swagger.model.Chapter;
import io.swagger.model.Error;
import io.swagger.model.StorySummary;

import java.util.List;
import io.swagger.api.NotFoundException;

import java.io.InputStream;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.validation.constraints.*;
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public abstract class StoriesApiService {
    public abstract Response createChapter(String storyKey,Chapter chapter,SecurityContext securityContext) throws NotFoundException;
    public abstract Response createStory(StorySummary story,SecurityContext securityContext) throws NotFoundException;
    public abstract Response getChapter(String storyKey,Integer chapterId,SecurityContext securityContext) throws NotFoundException;
    public abstract Response getChapters(String storyKey,SecurityContext securityContext) throws NotFoundException;
    public abstract Response getStorySummaries(SecurityContext securityContext) throws NotFoundException;
    public abstract Response getStorySummary(String storyKey,SecurityContext securityContext) throws NotFoundException;
    public abstract Response patchChapter(String storyKey,Integer chapterId,Chapter chapter,SecurityContext securityContext) throws NotFoundException;
    public abstract Response updateChapter(String storyKey,Integer chapterId,Chapter chapter,SecurityContext securityContext) throws NotFoundException;
    public abstract Response updateStorySummary(String storyKey,StorySummary story,SecurityContext securityContext) throws NotFoundException;
}

package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

import java.util.Date;

/**
 * Representation for story information.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StorySummary {

    private String storyKey;
    private String title;
    private String authorId;
    private String penName;
    private String tagLine;
    private String about;
    private int firstChapter;
    private Date publishedAt;
    private int version;

    public static StorySummary create(String storyKey, int version, String title,
                                      String penName, String tagLine, String about,
                                      int firstChapter, Date publishedAt) {
        StorySummary summary = new StorySummary();
        summary.storyKey = storyKey;
        summary.authorId = "ARN::" + penName;
        summary.version = version;
        summary.title = title;
        summary.penName = penName;
        summary.tagLine = tagLine;
        summary.about = about;
        summary.firstChapter = firstChapter;
        summary.publishedAt = publishedAt;
        return summary;
    }

    public static StorySummary createForUpdate(String storyKey, String title, String penName,
                                               String tagLine, String about, int firstChapter) {
        StorySummary summary = new StorySummary();
        summary.storyKey = storyKey;
        summary.title = title;
        summary.penName = penName;
        summary.tagLine = tagLine;
        summary.about = about;
        summary.firstChapter = firstChapter;
        return summary;
    }

    @JsonProperty
    public String getStoryKey() {
        return storyKey;
    }

    @JsonProperty
    public String getTitle() {
        return title;
    }

    @JsonProperty
    public String getAuthorId() {
        return authorId;
    }

    @JsonProperty
    public String getPenName() {
        return penName;
    }

    @JsonProperty
    public String getTagLine() {
        return tagLine;
    }

    @JsonProperty
    public String getAbout() {
        return about;
    }

    @JsonProperty
    public int getFirstChapter() {
        return firstChapter;
    }

    @JsonProperty
    public Date getPublishedAt() {
        return publishedAt;
    }

    @JsonProperty
    public int getVersion() {
        return version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StorySummary that = (StorySummary) o;
        return getFirstChapter() == that.getFirstChapter() &&
                getVersion() == that.getVersion() &&
                Objects.equal(getStoryKey(), that.getStoryKey()) &&
                Objects.equal(getAuthorId(), that.getAuthorId()) &&
                Objects.equal(getTitle(), that.getTitle()) &&
                Objects.equal(getPenName(), that.getPenName()) &&
                Objects.equal(getTagLine(), that.getTagLine()) &&
                Objects.equal(getAbout(), that.getAbout()) &&
                Objects.equal(getPublishedAt(), that.getPublishedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getStoryKey(), getTitle(), getAuthorId(), getPenName(), getTagLine(), getAbout(), getFirstChapter(), getPublishedAt(), getVersion());
    }

    @Override
    public String toString() {
        return "StorySummary{" +
                "storyKey='" + storyKey + '\'' +
                ", title='" + title + '\'' +
                ", authorId='" + authorId + '\'' +
                ", penName='" + penName + '\'' +
                ", tagLine='" + tagLine + '\'' +
                ", about='" + about + '\'' +
                ", firstChapter=" + firstChapter +
                ", publishedAt=" + publishedAt +
                ", version=" + version +
                '}';
    }
}

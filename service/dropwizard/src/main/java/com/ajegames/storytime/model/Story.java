package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

import java.util.ArrayList;
import java.util.List;

/**
 * Representation for the chapter.
 */
public class Story {

    private StorySummary summary;
    private List<Chapter> chapters;

    public static Story create(final StorySummary summary, final List<Chapter> chapters) {
        Story story = new Story();
        story.summary = summary;
        story.chapters = chapters != null ? new ArrayList<Chapter>(chapters) : new ArrayList<Chapter>();
        return story;
    }

    @JsonProperty
    public StorySummary getSummary() {
        return summary;
    }

    @JsonProperty
    public List<Chapter> getChapters() {
        return chapters;
    }

    @Override
    public String toString() {
        return "Story{" +
                "summary=" + summary +
                ", chapters=" + chapters +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Story story = (Story) o;
        return Objects.equal(summary, story.summary) &&
                Objects.equal(chapters, story.chapters);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(summary, chapters);
    }
}

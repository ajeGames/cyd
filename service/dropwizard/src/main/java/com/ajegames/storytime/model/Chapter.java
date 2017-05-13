package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

import java.util.ArrayList;
import java.util.List;

/**
 * Representation for the chapter.
 */
public class Chapter implements Comparable {

    private Integer chapterId;
    private String heading;
    private String prose;
    private List<ChapterSign> signpost;

    public static Chapter create(final Integer chapterId, final String heading, final String prose,
                                 final List<ChapterSign> options) {
        Chapter chapter = new Chapter();
        chapter.chapterId = chapterId;
        chapter.heading = heading;
        chapter.prose = prose;
        chapter.signpost = options;
        return chapter;
    }

    public static Chapter createWithID(Integer chapterId) {
        Chapter chapter = new Chapter();
        chapter.chapterId = chapterId;
        chapter.signpost = new ArrayList<ChapterSign>();
        return chapter;
    }


    @JsonProperty
    public Integer getChapterId() {
        return chapterId;
    }

    @JsonProperty
    public String getHeading() {
        return heading;
    }

    @JsonProperty
    public String getProse() {
        return prose;
    }

    @JsonProperty
    public List<ChapterSign> getSignpost() {
        return signpost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Chapter chapter = (Chapter) o;
        return Objects.equal(chapterId, chapter.chapterId) &&
                Objects.equal(heading, chapter.heading) &&
                Objects.equal(prose, chapter.prose) &&
                Objects.equal(signpost, chapter.signpost);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(chapterId, heading, prose, signpost);
    }

    @Override
    public String toString() {
        return "Chapter{" +
                "chapterId=" + chapterId +
                ", heading='" + heading + '\'' +
                ", prose='" + prose + '\'' +
                ", signpost=" + signpost +
                '}';
    }

    public int compareTo(Object o) {
        if (this.equals(o)) return 0;
        if (o == null) return -1;  // force null objects to the end

        Chapter chapter = (Chapter) o;
        if (chapterId.equals(chapter.getChapterId())) return 0;
        return (chapterId < chapter.getChapterId()) ? -1 : 1;
    }
}

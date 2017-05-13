package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

/**
 * Used to explain one of the options before our fair reader.  The chapter ID is that of the chapter the reader will
 * be taken to if selected.  The teaser is what the reader will presented in order to choose an option.
 */
public class ChapterSign {

    private Integer destinationId;
    private String teaser;

    public static ChapterSign create(final Integer destinationId, final String teaser) {
        final ChapterSign sign = new ChapterSign();
        sign.destinationId = destinationId;
        sign.teaser = teaser;
        return sign;
    }

    @JsonProperty
    public Integer getDestinationId() {
        return destinationId;
    }

    @JsonProperty
    public String getTeaser() {
        return teaser;
    }

    @Override
    public String toString() {
        return "ChapterSign{" +
                "destinationId=" + destinationId +
                ", teaser='" + teaser + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChapterSign that = (ChapterSign) o;
        return Objects.equal(destinationId, that.destinationId) &&
                Objects.equal(teaser, that.teaser);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(destinationId, teaser);
    }
}

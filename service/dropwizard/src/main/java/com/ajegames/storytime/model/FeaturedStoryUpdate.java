package com.ajegames.storytime.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.Objects;

import java.util.List;

/**
 * Details about stories to feature and stop featuring.
 */
public class FeaturedStoryUpdate {

    private List<String> toAdd;
    private List<String> toRemove;

    public static FeaturedStoryUpdate create(final List<String> toAdd, final List<String> toRemove) {
        FeaturedStoryUpdate featured = new FeaturedStoryUpdate();
        featured.toAdd = toAdd;
        featured.toRemove = toRemove;
        return featured;
    }

    @Override
    public String toString() {
        return "FeaturedStoryUpdate{" +
                "toAdd=" + toAdd +
                ", toRemove=" + toRemove +
                '}';
    }

    @JsonProperty
    public List<String> getToAdd() {
        return toAdd;
    }

    @JsonProperty
    public List<String> getToRemove() {
        return toRemove;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FeaturedStoryUpdate that = (FeaturedStoryUpdate) o;
        return Objects.equal(getToAdd(), that.getToAdd()) &&
                Objects.equal(getToRemove(), that.getToRemove());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getToAdd(), getToRemove());
    }
}

package com.ajegames.storytime.data;

import com.ajegames.storytime.model.Story;

import java.util.List;

public interface StoryTimePersistence {

    /**
     * Pulls all stories into memory.
     * @return list of Story objects read from persistence
     */
    List<Story> loadStories();

    /**
     * Saves to persistent storage.
     * @param story Story to store
     */
    void saveStory(Story story);

    /**
     * Deletes a story and all associated parts.
     *
     * @param storyKey The story to delete
     * @return true if story was deleted, otherwise false
     */
    boolean deleteStory(String storyKey);
}

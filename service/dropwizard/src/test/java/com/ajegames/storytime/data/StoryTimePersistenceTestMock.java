package com.ajegames.storytime.data;

import com.ajegames.storytime.model.Story;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This class is meant to be used for testing repository methods that invoke persistence.
 */
public class StoryTimePersistenceTestMock implements StoryTimePersistence {

    private static Logger LOG = LoggerFactory.getLogger(StoryTimePersistenceTestMock.class);

    private Map<String, Story> testStoryMap = new HashMap<String, Story>();
    private List<Story> toLoad = new ArrayList<Story>();

    public List<Story> loadStories() {
        LOG.info("Called loadStories");
        return toLoad;
    }

    public void saveStory(Story story) {
        LOG.info("Called saveStory");
        testStoryMap.put(story.getSummary().getStoryKey(), story);
    }

    public boolean deleteStory(String storyKey) {
        LOG.info("Called deleteStory");
        Story removed = testStoryMap.remove(storyKey);
        return removed != null;
    }

    // added methods for probing persistence mock

    /**
     * For determining if save / delete have worked.
     * @param storyKey key of story to look for
     * @return
     */
    public boolean hasStory(String storyKey) {
        return testStoryMap.containsKey(storyKey);
    }

    /**
     * Populates stories "to be loaded."
     *
     * NOTE: This is not written for multi-threading.
     *
     * @return
     */
    public void setStoriesToLoad(List<Story> storiesToLoad) {
        toLoad = storiesToLoad;
    }
}

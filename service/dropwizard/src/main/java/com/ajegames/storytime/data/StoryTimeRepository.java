package com.ajegames.storytime.data;

import com.ajegames.storytime.model.Story;
import com.ajegames.storytime.model.Storybook;
import com.ajegames.util.RandomString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StoryTimeRepository {

    private static StoryTimeRepository instance;
    private static Logger LOG = LoggerFactory.getLogger(StoryTimeRepository.class);

    private RandomString keyGenerator;
    private Map<String, Storybook> stories;
    private StoryTimePersistence storage;

    /**
     * One source of truth to hold all of the stories.
     *
     * @return StoryTimeRepository singleton
     */
    public static StoryTimeRepository getInstance() {
        if (instance == null) {
            instance = new StoryTimeRepository();
        }
        return instance;
    }

    /**
     * DO NOT USE except for testing.  Normally the repository should be a singleton, which is
     * available via getInstance.
     */
    public static StoryTimeRepository create() {
        return new StoryTimeRepository();
    }

    private StoryTimeRepository() {
        this.keyGenerator = new RandomString(8);
        this.stories = new HashMap<String, Storybook>();
        this.storage = new NoopStoryTimePersistence();
    }

    /**
     * For injecting persistence mechanism.
     *
     * @param persistenceImpl mechanism to handle persistence
     */
    public void setPersistence(StoryTimePersistence persistenceImpl) {
        LOG.debug("Setting persistence mechanism");
        if (persistenceImpl == null) {
            throw new IllegalArgumentException("Persistence mechanism cannot be null");
        }
        this.storage = persistenceImpl;
        loadStories();
    }

    /**
     * Creates and persists new, empty storybook with a unique key, ready to be populated with an intriguing adventure.
     *
     * @return freshly minted Storybook
     */
    synchronized public Storybook createStorybook() {
        String tempKey;
        do {
            tempKey = keyGenerator.nextKey();
        } while (stories.containsKey(tempKey));
        LOG.debug("Creating new story.  key=" + tempKey);
        Storybook book = Storybook.createWithKey(tempKey);
        saveStory(book);
        return book;
    }

    public void saveStory(Storybook book) {
        if (book == null || book.getStoryKey() == null) {
            LOG.warn("Called with null, or tried to save story without key.");
            throw new IllegalArgumentException("The storybook must already have an assigned key.  Use createStorybook" +
                    " to create a storybook with a generated key.");
        }
        LOG.debug("Saving story: " + book.getSummary().getStoryKey());
        cacheStorybook(book);
        this.storage.saveStory(book.getStory());
    }

    public void loadStories() {
        List<Story> stories = storage.loadStories();
        LOG.debug("Loading " + stories.size() + " stories");
        for (Story story : stories) {
            cacheStorybook(Storybook.load(story));
        }
    }

    private void cacheStorybook(Storybook book) {
        LOG.debug("Adding story: " + book.getSummary().getStoryKey());
        stories.put(book.getSummary().getStoryKey(), book);
    }

    public Storybook getStorybook(String storyKey) {
        return stories.get(storyKey);
    }

    public void deleteStory(String storyKey) {
        LOG.debug("Deleting story: " + storyKey);
        storage.deleteStory(storyKey);
        stories.remove(storyKey);
    }

    public List<Storybook> getAllStorybooks() {
        LOG.debug("Retrieving full list of stories");
        List<Storybook> all = new ArrayList<Storybook>();
        all.addAll(stories.values());
        return all;
    }
}

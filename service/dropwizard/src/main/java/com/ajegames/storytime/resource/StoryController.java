package com.ajegames.storytime.resource;

import com.ajegames.storytime.data.StoryTimeRepository;
import com.ajegames.storytime.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Controls actions having to do with stories.
 */
public class StoryController {

    private static Logger LOG = LoggerFactory.getLogger(StoryController.class);

    private StoryTimeRepository repo = StoryTimeRepository.getInstance();

    public static StoryController create() {
        return new StoryController();
    }

    static StoryController createWithMockControllerForTesting(StoryTimeRepository testRepo) {
        StoryController ctrl = new StoryController();
        ctrl.repo = testRepo;
        return ctrl;
    }

    private StoryController() {}

    public StorySummary createStory(StorySummary summary) {
        if (summary.getStoryKey() != null) {
            LOG.warn("Given summary has a key, but create is for new stories; perhaps update was intended.");
            throw new IllegalArgumentException("Either remove key value or do an update");
        }
        LOG.info("Creating a new story entitled: " + summary.getTitle());
        Storybook book = repo.createStorybook();
        Chapter firstChapter = book.addChapter();
        book.setSummary(StorySummary.create(book.getStoryKey(), 0, summary.getTitle(),
                summary.getPenName(), summary.getTagLine(), summary.getAbout(),
                firstChapter.getChapterId(), null));
        repo.saveStory(book);
        return book.getSummary();
    }

    Story getStory(String storyKey) {
        LOG.info("Retrieving story with key: " + storyKey);
        Storybook book = repo.getStorybook(storyKey);
        return book != null ? repo.getStorybook(storyKey).getStory() : null;
    }

    void updateSummary(StorySummary update) {
        LOG.info("Updating story information: " + update.getStoryKey());
        Storybook bookToUpdate = repo.getStorybook(update.getStoryKey());
        if (bookToUpdate == null) {
            throw new IllegalArgumentException("Unable to find story to update");
        }
        bookToUpdate.setSummary(update);
        repo.saveStory(bookToUpdate);
    }

    public Chapter getChapter(String storyKey, Integer chapterId) {
        LOG.info("Retrieving chapter " + chapterId + " for story " + storyKey);
        return retrieveChapter(storyKey, chapterId);
    }

    private Chapter retrieveChapter(String storyKey, Integer chapterId) {
        Storybook book = repo.getStorybook(storyKey);
        if (book == null) {
            return null;
        }
        return book.getChapter(chapterId);
    }

    public void updateChapter(String storyKey, Chapter update) {
        LOG.info("Updating chapter " + update.getChapterId() + " for story " + storyKey);

        Storybook book = repo.getStorybook(storyKey);
        book.updateChapter(update);
        repo.saveStory(book);
    }

    Chapter addNextChapter(String storyKey, Integer parentChapterId, String teaser) {
        LOG.debug("Adding chapter to story: " + storyKey + " from chapter: " + parentChapterId
                + " with teaser: " + teaser);
        Storybook story = repo.getStorybook(storyKey);
        Chapter result = story.addNextChapterOption(parentChapterId, teaser);
        repo.saveStory(story);
        return result;
    }

    public void deleteStory(String storyKey) {
        LOG.debug("Deleting story: " + storyKey);
        repo.deleteStory(storyKey);
    }

    public Chapter getFirstChapter(String key) {
        Storybook book = repo.getStorybook(key);
        return book.getFirstChapter();
    }

    /**
     * TODO use cases for manipulating chapter chains
     * 1. How to detach and reattach chapter chains? -- enable selecting next chapter from list of existing
     * 2. How to detect chapters that are not attached?
     * 3. Whether to delete an entire chapter chain? -- have to be careful of loops; simpler to not allow but have a way to show orphan chains
     * 4. What to do when first chapter is deleted? -- don't allow
     */

    void deleteChapter(String key, Integer id) {
        Storybook book = repo.getStorybook(key);
        if (book == null) {
            throw new IllegalArgumentException("Book with key " + key + " not found");
        }
        book.deleteChapter(id);
    }

}

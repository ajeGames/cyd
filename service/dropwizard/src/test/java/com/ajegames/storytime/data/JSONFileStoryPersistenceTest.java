package com.ajegames.storytime.data;

import com.ajegames.storytime.model.Story;
import com.ajegames.storytime.model.StoryTestUtil;
import com.ajegames.util.RandomString;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.File;
import java.util.List;

public class JSONFileStoryPersistenceTest {

    private static final String TEST_PATH = "repo-test/good-examples/";
    private static final String TEST_PATH_BAD_LOAD = "repo-test/bad-load/";

    @Test
    public void testStoryPersistenceAPI() throws Exception {
        String pathName = "test-" + new RandomString(6).nextKey();  // play somewhere safe
        File path = new File(pathName);

        StoryTimePersistence storage = new JSONFileStoryTimePersistence(pathName);
        Assert.assertTrue(path.exists(), "Should have found path to story files");
        Assert.assertTrue(path.isDirectory(), "Should have created directory for story files");

        // try saving
        Story adv1 = StoryTestUtil.generateStory();
        storage.saveStory(adv1);
        Story adv2 = StoryTestUtil.generateStory();
        storage.saveStory(adv2);
        Assert.assertEquals(path.listFiles().length, 2, "Expected to find story files");

        // try loading
        List<Story> stories = storage.loadStories();
        Assert.assertNotNull(stories, "Did not find stories");
        Assert.assertEquals(stories.size(), 2, "Wrong number of stories loaded");

        // try deleting
        storage.deleteStory(adv1.getSummary().getStoryKey());
        storage.deleteStory(adv2.getSummary().getStoryKey());
        Assert.assertEquals(path.listFiles().length, 0, "Story files should be gone");

        // clean up
        path.delete();
    }

    @Test
    public void testLoadStories() throws Exception {
        StoryTimePersistence storage = new JSONFileStoryTimePersistence(TEST_PATH);
        List<Story> stories = storage.loadStories();
        Assert.assertEquals(stories.size(), 2);

        for (Story story : stories) {
            String storyKey = story.getSummary().getStoryKey();
            Assert.assertTrue(storyKey.equals("mvghheo8") || storyKey.equals("ni7l0szw"));
        }
    }

    @Test
    public void testThrowsWhenPathToRepoIsDirectory() {
        try {
            new JSONFileStoryTimePersistence(TEST_PATH + "mvghheo8.json");
        } catch (Exception e) {
            return;
        }
        Assert.fail("Was not supposed to allow path to non-directory");
    }

    @Test
    public void testThrowsWhenCannotCreateDirectory() {
        try {
            new JSONFileStoryTimePersistence("/forbidden/");  // root ought to be protected
        } catch (Exception e) {
            return;
        }
        Assert.fail("Was not supposed to allow path to non-directory");
    }

    @Test
    public void testHandlesUnknownDataStructureGracefully() {
        try {
            new JSONFileStoryTimePersistence(TEST_PATH_BAD_LOAD).loadStories();
        } catch (Exception e) {
            Assert.fail("Was not supposed to handle gracefully");
        }
    }
}

package com.ajegames.storytime.resource;

import com.ajegames.storytime.data.StoryTimePersistenceTestMock;
import com.ajegames.storytime.data.StoryTimeRepository;
import com.ajegames.storytime.model.Story;
import com.ajegames.storytime.model.StorySummary;
import com.ajegames.storytime.model.StoryTestUtil;
import com.ajegames.storytime.model.Storybook;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Tests CatalogController.
 */
public class CatalogControllerTest {

    private CatalogController ctrl;
    private StoryTimeRepository repo;

    @BeforeMethod
    public void setup() {
        repo = StoryTimeRepository.create();
        repo.setPersistence(new StoryTimePersistenceTestMock());
        ctrl = CatalogController.createWithMockControllerForTesting(repo);
    }

    /* As a player, I want to see a list of stories so that I can choose one to read. */
    @Test
    public void testGetAllStorySummaries() {
        Story story1 = StoryTestUtil.generateStory();
        Story story2 = StoryTestUtil.generateStory();
        Story story3 = StoryTestUtil.generateStory();
        repo.saveStory(Storybook.load(story1));
        repo.saveStory(Storybook.load(story2));
        repo.saveStory(Storybook.load(story3));

        List<StorySummary> allStorySummaries = ctrl.getAllStorySummaries();
        Assert.assertEquals(allStorySummaries.size(), 3);
        StorySummary summary1 = allStorySummaries.get(0);
        StorySummary summary2 = allStorySummaries.get(1);
        StorySummary summary3 = allStorySummaries.get(2);
        Assert.assertNotNull(summary1.getStoryKey());
        Assert.assertNotNull(summary1.getTagLine());
        Assert.assertNotNull(summary1.getTitle());
        Assert.assertNotNull(summary1.getPenName());
        Assert.assertNotNull(summary1.getFirstChapter());
        List<String> keys = new ArrayList<String>();
        for (StorySummary summary : allStorySummaries) {
            keys.add(summary.getStoryKey());
        }
        Assert.assertTrue(keys.contains(summary1.getStoryKey()));
        Assert.assertTrue(keys.contains(summary2.getStoryKey()));
        Assert.assertTrue(keys.contains(summary3.getStoryKey()));
    }

}

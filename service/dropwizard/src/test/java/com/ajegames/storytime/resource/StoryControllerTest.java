package com.ajegames.storytime.resource;

import com.ajegames.storytime.data.StoryTimePersistenceTestMock;
import com.ajegames.storytime.data.StoryTimeRepository;
import com.ajegames.storytime.model.*;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Tests methods for handling story creation, retrieval and updates.
 */
public class StoryControllerTest {

    private StoryController ctrl;

    @BeforeMethod
    public void setup() {
        StoryTimeRepository repo = StoryTimeRepository.create();
        repo.setPersistence(new StoryTimePersistenceTestMock());
        ctrl = StoryController.createWithMockControllerForTesting(repo);
    }

    @Test
    public void testCreateStory() {
        StorySummary summary = ctrl.createStory(StoryTestUtil.createWithoutKey("foo", "bar", "baz", "qux"));
        Assert.assertNotNull(summary.getStoryKey());
        Assert.assertEquals(summary.getTitle(), "foo");
        Assert.assertEquals(summary.getPenName(), "bar");
        Assert.assertEquals(summary.getTagLine(), "baz");
        Assert.assertEquals(summary.getAbout(), "qux");
        Assert.assertNotEquals(summary.getFirstChapter(), 0);
    }

    @Test
    public void testGetStory() {
        StorySummary adv1 = ctrl.createStory(StoryTestUtil.createWithoutKey("one", "one", "one", "one"));
        StorySummary adv2 = ctrl.createStory(StoryTestUtil.createWithoutKey("two", "two", "two", "two"));

        Assert.assertNotNull(ctrl.getStory(adv1.getStoryKey()));
        Assert.assertNotNull(ctrl.getStory(adv2.getStoryKey()));
    }

    @Test
    public void testUpdateStory() {
        StorySummary adv = ctrl.createStory(StoryTestUtil.createWithoutKey("three", "three", "three", "three"));
        StorySummary update = StorySummary.create(adv.getStoryKey(), 0, "updated",
                "updated", "updated", "updated",
                adv.getFirstChapter(), null);
        ctrl.updateSummary(update);
        StorySummary result = ctrl.getStory(update.getStoryKey()).getSummary();
        Assert.assertEquals(result.getTitle(), "updated");
        Assert.assertEquals(result.getPenName(), "updated");
        Assert.assertEquals(result.getTagLine(), "updated");
        Assert.assertEquals(result.getAbout(), "updated");

        StorySummary check = ctrl.getStory(adv.getStoryKey()).getSummary();
        Assert.assertEquals(check, result, "Return value should match stored value");
    }

    @Test
    public void testGetChapter() {
        StorySummary adv = ctrl.createStory(StoryTestUtil.createWithoutKey("four", "four", "four", "four"));
        Chapter chapterFound = ctrl.getFirstChapter(adv.getStoryKey());
        Assert.assertNotNull(chapterFound);
    }

    @Test
    public void testUpdateChapter() {
        StorySummary story = ctrl.createStory(StoryTestUtil.createWithoutKey("five", "five", "five", "five"));
        Chapter chap = ctrl.getFirstChapter(story.getStoryKey());

        List<ChapterSign> options = new ArrayList<ChapterSign>();
        options.add(ChapterSign.create(2000, "update"));
        options.add(ChapterSign.create(2001, "update"));
        Chapter update = Chapter.create(chap.getChapterId(), "update", "update", options);
        ctrl.updateChapter(story.getStoryKey(), update);

        Chapter result = ctrl.getFirstChapter(story.getStoryKey());
        Assert.assertNotNull(result);
        Assert.assertEquals(result.getHeading(), "update");
        Assert.assertEquals(result.getProse(), "update");
        Assert.assertEquals(result.getSignpost().size(), 2);
        Assert.assertEquals(result, update);
    }

    @Test
    public void testCreateNextChapter() {
        StorySummary story = ctrl.createStory(StoryTestUtil.createWithoutKey("six", "six", "six", "six"));
        Chapter first = ctrl.getFirstChapter(story.getStoryKey());
        Chapter result = ctrl.addNextChapter(story.getStoryKey(), first.getChapterId(), "Choose me!");

        // check that source chapter was updated with new option
        Assert.assertNotNull(result);
        Assert.assertNotEquals(result, first);
        Assert.assertEquals(first.getSignpost().size(), 0);
        Assert.assertEquals(result.getSignpost().size(), 1);

        // make sure update was preserved, not just returned the first time
        Chapter updatedFirst = ctrl.getFirstChapter(story.getStoryKey());
        Assert.assertEquals(updatedFirst, result);

        // check the sign to the new chapter
        ChapterSign newChapterSign = result.getSignpost().get(0);
        Assert.assertEquals(newChapterSign.getTeaser(), "Choose me!");

        // make sure new chapter exists
        Chapter newChapter = ctrl.getChapter(story.getStoryKey(), newChapterSign.getDestinationId());
        Assert.assertNotNull(newChapter);
    }

    @Test
    public void testCreateChainOfNextChapters() {
        StorySummary story = ctrl.createStory(StoryTestUtil.createWithoutKey("seven", "seven", "seven", "seven"));
        String storyKey = story.getStoryKey();

        Chapter node = ctrl.getFirstChapter(storyKey);
        for (int i=1; i <= 4; i++) {
            Assert.assertEquals(node.getSignpost().size(), 0);
            node = ctrl.addNextChapter(storyKey, node.getChapterId(), "level " + i);
            Assert.assertEquals(node.getSignpost().size(), 1);
            node = ctrl.getChapter(storyKey, node.getSignpost().get(0).getDestinationId());
            Assert.assertNotNull(node);
        }
    }

    @Test
    public void testDeleteStory() {
        StorySummary story = ctrl.createStory(StoryTestUtil.createWithoutKey("eight", "eight", "eight", "eight"));
        Assert.assertNotNull(ctrl.getStory(story.getStoryKey()));
        ctrl.deleteStory(story.getStoryKey());
        Assert.assertNull(ctrl.getStory(story.getStoryKey()));
    }

    @Test
    public void testDeleteChapter() {
        StorySummary story = ctrl.createStory(StoryTestUtil.createWithoutKey("eight", "eight", "eight", "eight"));
        Chapter sourceChapter = ctrl.addNextChapter(story.getStoryKey(), ctrl.getFirstChapter(story.getStoryKey()).getChapterId(),
                "chapter two");
        Assert.assertEquals(sourceChapter.getSignpost().size(), 1);
        Chapter next = ctrl.getChapter(story.getStoryKey(),
                sourceChapter.getSignpost().get(0).getDestinationId());
        Assert.assertNotNull(next);

        ctrl.deleteChapter(story.getStoryKey(), next.getChapterId());
        Assert.assertNull(ctrl.getChapter(story.getStoryKey(), next.getChapterId()));
    }
}

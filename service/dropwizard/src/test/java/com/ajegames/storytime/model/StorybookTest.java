package com.ajegames.storytime.model;

import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.SortedSet;

/**
 * Test Storybook, which is the dynamic center of the model.
 */
public class StorybookTest {

    @Test
    public void testLoadStory() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);

        Assert.assertEquals(bookOut.getStoryKey(), testStory.getSummary().getStoryKey());
        Assert.assertEquals(bookOut.getSummary(), testStory.getSummary());
        Assert.assertEquals(bookOut.getChapters().size(), testStory.getChapters().size());
    }

    @Test
    public void testCreateInstanceWithKey() {
        Storybook testStory = Storybook.createWithKey("MYFANCYKEY");
        Assert.assertEquals(testStory.getStoryKey(), "MYFANCYKEY");
    }

    @Test
    public void testGetStory() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        Story testOut = bookOut.getStory();
        Assert.assertEquals(testOut, testStory);
    }

    @Test
    public void testUpdateStorySummary() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        StorySummary testSummary = testStory.getSummary();

        StorySummary update = StorySummary.create(testSummary.getStoryKey(), 0,
                "update", "update", "update", "update",
                9999, null);
        bookOut.setSummary(update);

        Assert.assertEquals(bookOut.getSummary(), update);
    }

    @Test
    public void testGetFirstChapter() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        Assert.assertNotNull(bookOut.getFirstChapter());
    }

    @Test
    public void testAddChapterIncrementsChapterNumber() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);

        Chapter chapterA = bookOut.addChapter();
        Chapter chapterB = bookOut.addChapter();
        Chapter chapterC = bookOut.addChapter();
        Assert.assertEquals(chapterB.getChapterId().intValue(), chapterA.getChapterId() + 1);
        Assert.assertEquals(chapterC.getChapterId().intValue(), chapterB.getChapterId() + 1);
    }

    @Test
    public void testGetChapters() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);

        SortedSet<Chapter> chapters = bookOut.getChapters();
        Assert.assertEquals(chapters.size(), 3);  // all accounted for?

        // sorted properly?
        int previousChapter = 0;
        for (Chapter next : chapters) {
            Assert.assertTrue(previousChapter < next.getChapterId());
            previousChapter = next.getChapterId();
        }
    }

    @Test
    public void testUpdateChapter() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        int chapterCount = bookOut.getChapters().size();
        Chapter first = bookOut.getFirstChapter();
        Chapter update = Chapter.create(first.getChapterId(), "update", "update", first.getSignpost());
        bookOut.updateChapter(update);
        Assert.assertEquals(bookOut.getChapter(first.getChapterId()), update);
        Assert.assertEquals(bookOut.getChapters().size(), chapterCount);
    }

    @Test
    public void testUpdateChapterFailsWhenChapterNotFound() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        Chapter first = bookOut.getFirstChapter();
        Chapter update = Chapter.create(10001, "update", "update", first.getSignpost());
        try {
            bookOut.updateChapter(update);
        } catch (Exception e) {
            // success
            return;
        }
        Assert.fail();
    }

    @Test
    public void testUpdateChapterFailsWithNull() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        Chapter first = bookOut.getFirstChapter();
        Chapter update = Chapter.create(null, "update", "update", first.getSignpost());
        try {
            bookOut.updateChapter(update);
        } catch (Exception e) {
            // success
            return;
        }
        Assert.fail();
    }

    @Test
    public void testUpdateChapterFailsWhenChapterIsNull() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        try {
            bookOut.updateChapter(null);
        } catch (Exception e) {
            // success
            return;
        }
        Assert.fail();
    }

    @Test
    public void testAddNextChapterOption() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);
        Chapter sourceChapter = bookOut.getFirstChapter();

        int numOptions = sourceChapter.getSignpost().size();
        Chapter updatedSourceChapter = bookOut.addNextChapterOption(sourceChapter.getChapterId(), "Choose Me");

        Assert.assertNotNull(updatedSourceChapter);
        Assert.assertEquals(updatedSourceChapter.getSignpost().size(), numOptions + 1);
        for (ChapterSign sign : updatedSourceChapter.getSignpost()) {
            if (sign.getTeaser().equals("Choose Me")) {
                Assert.assertNotNull(sign.getDestinationId());
                Assert.assertNotNull(bookOut.getChapter(sign.getDestinationId()));
                return;
            }
        }
        Assert.fail();
    }

    @Test
    public void testDeleteChapter() {
        Story testStory = StoryTestUtil.generateSimpleNonTrivialStory();
        Storybook bookOut = Storybook.load(testStory);

        Assert.assertEquals(bookOut.getChapters().size(), 3);
        Assert.assertEquals(bookOut.getFirstChapter().getSignpost().size(), 2);

        bookOut.deleteChapter(1002);
        Assert.assertNull(bookOut.getChapter(1002));
        Assert.assertEquals(bookOut.getChapters().size(), 2);
        Assert.assertEquals(bookOut.getFirstChapter().getSignpost().size(), 1);
        Assert.assertEquals(bookOut.getFirstChapter().getSignpost().get(0).getDestinationId().intValue(), 1001);
    }

}

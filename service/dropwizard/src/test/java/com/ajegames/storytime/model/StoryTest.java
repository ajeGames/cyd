package com.ajegames.storytime.model;

import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

/**
 * Tests the representation.
 */
public class StoryTest extends RepresentationTestBase {

    private static final Story NORMAL_STORY = buildNormalStory();
    private static final Story EMPTY_STORY = buildEmptyStory();

    @Test
    public void testSerializesToJSON_Normal() throws Exception {
        super.testSerializesToJSON("fixtures/Story-normal.json", Story.class, NORMAL_STORY);
    }

    @Test
    public void testDeserializesFromJSON_Normal() throws Exception {
        super.testDeserializesFromJSON("fixtures/Story-normal.json", Story.class, NORMAL_STORY);
    }

    @Test
    public void testSerializesToJSON_Empty() throws Exception {
        super.testSerializesToJSON("fixtures/Story-empty.json", Story.class, EMPTY_STORY);
    }

    @Test
    public void testDeserializesFromJSON_Empty() throws Exception {
        super.testDeserializesFromJSON("fixtures/Story-empty.json", Story.class, EMPTY_STORY);
    }

    // ==== builders ====

    private static Story buildNormalStory() {

        SortedSet<Chapter> chapters = new TreeSet<Chapter>();
        List<ChapterSign> options = new ArrayList<ChapterSign>();
        options.add(ChapterSign.create(1001, "Take a walk in the rain."));
        options.add(ChapterSign.create(1002, "Stay inside."));
        chapters.add(Chapter.create(1000, "Chapter 1", "It was a dark and stormy night.", options));
        chapters.add(Chapter.create(1001, "Chapter 2",
                "As you step outside, you notice a man with a wide-brimmed hat.  Your adventure has just begun...",
                null));
        chapters.add(Chapter.create(1002, "Chapter 3",
                "You settle in for a nice evening by the fire.  The End.", null));

        return Story.create(
                StorySummary.create("0123456789abcdef", 0, "Rain",
                        "Bubba Gump", "Want a fun adventure?  Just add water.",
                        "Come have an adventure.", 1000, null),
                new ArrayList<Chapter>(chapters));
    }

    private static Story buildEmptyStory() {
        return new Story();
    }

}

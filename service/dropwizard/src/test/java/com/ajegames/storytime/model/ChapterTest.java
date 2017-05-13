package com.ajegames.storytime.model;

import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Tests the Chapter representation.
 */
public class ChapterTest extends RepresentationTestBase {

    private static final Chapter NORMAL_CHAPTER = buildNormalChapter();
    private static final Chapter EMPTY_CHAPTER = buildEmptyChapter();

    @Test
    public void testSerializesToJSON_Normal() throws Exception {
        super.testSerializesToJSON("fixtures/Chapter-normal.json", Chapter.class, NORMAL_CHAPTER);
    }

    @Test
    public void testDeserializesFromJSON_Normal() throws Exception {
        super.testDeserializesFromJSON("fixtures/Chapter-normal.json", Chapter.class, NORMAL_CHAPTER);
    }

    @Test
    public void testSerializesToJSON_Empty() throws Exception {
        super.testSerializesToJSON("fixtures/Chapter-empty.json", Chapter.class, EMPTY_CHAPTER);
    }

    @Test
    public void testDeserializesFromJSON_Empty() throws Exception {
        super.testDeserializesFromJSON("fixtures/Chapter-empty.json", Chapter.class, EMPTY_CHAPTER);
    }

    // ==== builders ====

    private static Chapter buildNormalChapter() {
        List<ChapterSign> options = new ArrayList<ChapterSign>();
        options.add(ChapterSign.create(1001, "Take a walk in the rain."));
        options.add(ChapterSign.create(1002, "Stay inside."));
        return Chapter.create(1000, "Chapter 1", "It was a dark and stormy night.", options);
    }

    private static Chapter buildEmptyChapter() {
        return new Chapter();
    }
}

package com.ajegames.storytime.model;

import org.testng.annotations.Test;

/**
 * Tests the ChapterSign representation.
 */
public class ChapterSignTest extends RepresentationTestBase {

    private static final ChapterSign NORMAL_SIGN = buildNormalChapterSign();

    @Test
    public void testSerializesToJSON_Normal() throws Exception {
        super.testSerializesToJSON("fixtures/ChapterSign-normal.json", ChapterSign.class, NORMAL_SIGN);
    }

    @Test
    public void testDeserializesFromJSON_Normal() throws Exception {
        super.testDeserializesFromJSON("fixtures/ChapterSign-normal.json", ChapterSign.class, NORMAL_SIGN);
    }

    // ==== builders ====

    private static ChapterSign buildNormalChapterSign() {
        return ChapterSign.create(1000, "Start here");
    }
}

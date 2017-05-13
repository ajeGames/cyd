package com.ajegames.storytime.resource;

import io.dropwizard.testing.junit.ResourceTestRule;
import org.junit.Assert;
import org.junit.ClassRule;
import org.junit.Test;

import javax.ws.rs.core.Response;

/**
 * Test as a resource.
 */
public class StoryTimeResourceTest {

    @ClassRule
    public static final ResourceTestRule TEST_RULE = ResourceTestRule.builder()
            .addResource(new StoryTimeResource())
            .build();

    @Test
    public void testPing() {
        Response response = TEST_RULE.getJerseyTest().target("api/storytime").request().get();
        Assert.assertNotNull(response);
    }
}

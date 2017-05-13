package com.ajegames.storytime.model;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.dropwizard.jackson.Jackson;
import org.testng.Assert;

import static io.dropwizard.testing.FixtureHelpers.fixture;

/**
 * Base class for supporting tests of representation classes.  Includes serialization to and deserialization from
 * JSON.
 */
public abstract class RepresentationTestBase {

    protected static final ObjectMapper MAPPER = Jackson.newObjectMapper();

    /**
     * Converts given representation to JSON and compares against expected value loaded as fixture.
     *
     * @param pathToFixture the file to load for comparison
     * @param representationType the class to use for mapping
     * @param representation instance to test
     * @throws Exception
     */
    public void testSerializesToJSON(String pathToFixture, Class representationType, Object representation)
            throws Exception {

        final String expected = MAPPER.writeValueAsString(
                MAPPER.readValue(fixture(pathToFixture), representationType));
        Assert.assertEquals(MAPPER.writeValueAsString(representation), expected);
    }

    /**
     * Converts given JSON file to object and compares against reference representation.
     *
     * @param pathToFixture the file to deserialize
     * @param representationType the class to use for mapping
     * @param representation instance to compare against
     * @throws Exception
     */
    public void testDeserializesFromJSON(String pathToFixture, Class representationType,
                                                Object representation) throws Exception {

        Assert.assertEquals(MAPPER.readValue(fixture(pathToFixture), representationType), representation);
    }

}

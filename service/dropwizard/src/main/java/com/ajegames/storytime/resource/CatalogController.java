package com.ajegames.storytime.resource;

import com.ajegames.storytime.data.StoryTimeRepository;
import com.ajegames.storytime.model.StorySummary;
import com.ajegames.storytime.model.Storybook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * Controls actions related to stories in bulk.
 */
public class CatalogController {

    private static Logger LOG = LoggerFactory.getLogger(CatalogController.class);

    private StoryTimeRepository repo = StoryTimeRepository.getInstance();

    public static CatalogController create() {
        return new CatalogController();
    }

    static CatalogController createWithMockControllerForTesting(StoryTimeRepository testRepo) {
        CatalogController ctrl = new CatalogController();
        ctrl.repo = testRepo;
        return ctrl;
    }

    private CatalogController() {}

    /**
     * Returns all story summaries found in repository.
     *
     * @return List of StorySummary
     */
    List<StorySummary> getAllStorySummaries() {
        LOG.info("Fetching all stories in repository");

        List<Storybook> stories = repo.getAllStorybooks();
        List<StorySummary> results = new ArrayList<StorySummary>(stories.size());
        for (Storybook book : stories) {
            results.add(book.getSummary());
        }
        return results;
    }
}

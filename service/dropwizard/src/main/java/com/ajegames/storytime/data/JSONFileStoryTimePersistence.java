package com.ajegames.storytime.data;

import com.ajegames.storytime.model.Story;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * This is the implementation of persistence that is meant for production.
 */
public class JSONFileStoryTimePersistence implements StoryTimePersistence {

    private static final Logger LOG = LoggerFactory.getLogger(JSONFileStoryTimePersistence.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    private File pathToFiles;

    public JSONFileStoryTimePersistence(String pathToFiles) {
        this.pathToFiles = new File(pathToFiles);
        if (!this.pathToFiles.exists()) {
            LOG.warn("Creating directory to hold story files.");
            if (!this.pathToFiles.mkdir()) {
                throw new RuntimeException("Unable to create path for story files.");
            }
        } else if (!this.pathToFiles.isDirectory()) {
            LOG.error("Path to story files must point to a directory. " + pathToFiles);
            throw new RuntimeException("Path to story files must point to a directory. " + pathToFiles);
        }
    }

    public List<Story> loadStories() {
        List<Story> out = new ArrayList<Story>();
        File[] files = pathToFiles.listFiles();
        if (files != null) {
            for (File file : files) {
                try {
                    Story loadedStory = MAPPER.readValue(file, Story.class);
                    out.add(loadedStory);
                } catch (IOException e) {
                    LOG.error("File could not be read as Story: " + file.toString(), e);
                }
            }
        }
        return out;
    }

    public void saveStory(Story story) {
        try {
            MAPPER.writeValue(buildFilename(story.getSummary().getStoryKey()), story);
        } catch (IOException e) {
            LOG.error("Something went wrong when writing out the story", e);
        }
    }

    private File buildFilename(String baseName) {
        return new File(pathToFiles, baseName + ".json");
    }

    public boolean deleteStory(String storyKey) {
        File fileToDelete = buildFilename(storyKey);
        return fileToDelete.delete();
    }
}

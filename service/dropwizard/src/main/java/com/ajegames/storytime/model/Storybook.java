package com.ajegames.storytime.model;

import java.util.*;

/**
 * Mutable class that handles dynamic parts of the story, aggregations, indexes, etc.  This is not meant to be passed
 * around via JSON, but it holds all of the parts that are.  The goal is to allow representation classes to be
 * immutable, while all of the action is handled here.  In short, the "bookkeeping" happens here.
 */
public class Storybook {

    private String storyKey;
    private int nextChapterId = 1000;
    private StorySummary summary;
    private SortedSet<Chapter> chapters;
    private Map<Integer, Chapter> chapterIndex;

    public static Storybook createWithKey(String storyKey) {
        Storybook book = new Storybook();
        book.setStoryKey(storyKey);
        return book;
    }

    public static Storybook load(Story storyToLoad) {
        Storybook book = new Storybook();
        book.setSummary(storyToLoad.getSummary());
        book.chapters.addAll(storyToLoad.getChapters());
        book.initializeAfterLoad();
        return book;
    }

    private Storybook() {
        chapters = new TreeSet<Chapter>();
        chapterIndex = new HashMap<Integer, Chapter>();
    }

    private void initializeAfterLoad() {
        this.storyKey = summary.getStoryKey();
        reindexChapters();
    }

    private void reindexChapters() {
        // reload chapter index and set next chapter ID
        int highestChapter = 0;
        if (chapterIndex == null || !chapterIndex.isEmpty()) {
            chapterIndex = new HashMap<Integer, Chapter>();
        }
        for (Chapter chapter : chapters) {
            chapterIndex.put(chapter.getChapterId(), chapter);
            if (chapter.getChapterId() > highestChapter) {
                highestChapter = chapter.getChapterId();
            }
        }
        nextChapterId = highestChapter + 1;
    }

    public String getStoryKey() {
        return storyKey;
    }

    private void setStoryKey(String storyKey) {
        if (this.storyKey != null) {
            throw new IllegalStateException("key is already defined; enforcing immutable key");
        } else if (storyKey == null) {
            throw new IllegalArgumentException("key cannot be set to null");
        }
        this.storyKey = storyKey;
        StorySummary current = (summary != null) ? summary : new StorySummary();
        // TODO re-think this
        summary = StorySummary.create(this.storyKey, 0, current.getTitle(),
                current.getPenName(), current.getTagLine(), current.getAbout(),
                current.getFirstChapter(), null);
    }

    public Story getStory() {
        return Story.create(summary, new ArrayList<Chapter>(chapters));
    }

    public StorySummary getSummary() {
        return summary;
    }

    public void setSummary(StorySummary summary) {
        this.summary = summary;
    }

    /**
     * Adds another chapter and the chapter sign that points to it.
     *
     * @param sourceChapterId chapter option is attached to
     * @param teaser words that explain the option
     * @return updated source chapter
     */
    public Chapter addNextChapterOption(Integer sourceChapterId, String teaser) {
        Chapter fromChapter = getChapter(sourceChapterId);
        if (fromChapter == null) {
            throw new IllegalArgumentException("Source chapter not found");
        }
        Chapter toChapter = addChapter();
        List<ChapterSign> nextChapterOptions = new ArrayList<ChapterSign>(fromChapter.getSignpost());
        nextChapterOptions.add(ChapterSign.create(toChapter.getChapterId(), teaser));
        fromChapter = Chapter.create(fromChapter.getChapterId(), fromChapter.getHeading(),
                fromChapter.getProse(), nextChapterOptions);
        updateChapter(fromChapter);
        return fromChapter;
    }

    public SortedSet<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(Set<Chapter> chapters) {
        this.chapters.addAll(chapters);
        reindexChapters();
    }

    public Chapter addChapter() {
        Chapter newChapter = Chapter.createWithID(nextChapterId++);
        chapters.add(newChapter);
        chapterIndex.put(newChapter.getChapterId(), newChapter);
        return newChapter;
    }

    public Chapter getChapter(Integer id) {
        return chapterIndex.get(id);
    }

    public Chapter getFirstChapter() {
        return (getSummary() != null) ? getChapter(getSummary().getFirstChapter()) : null;
    }

    public void updateChapter(Chapter update) {
        if (update == null || update.getChapterId() == null) {
            throw new IllegalArgumentException("Chapter and ID cannot be null");
        }
        Chapter toUpdate = getChapter(update.getChapterId());
        if (toUpdate == null) {
            throw new IllegalArgumentException("Chapter not found; cannot update");
        }
        chapters.remove(toUpdate);
        chapterIndex.remove(toUpdate.getChapterId());

        chapters.add(update);
        chapterIndex.put(update.getChapterId(), update);
    }

    public void deleteChapter(Integer chapterId) {
        Chapter toDelete = getChapter(chapterId);
        if (toDelete == null) {
            return;
        }
        chapters.remove(toDelete);
        chapterIndex.remove(toDelete.getChapterId());
        removeSignsToChapter(chapterId);
    }

    private void removeSignsToChapter(Integer chapterId) {
        for (Chapter chap : chapters) {
            if (chap.getSignpost() == null) {
                continue;
            }
            Iterator<ChapterSign> signIter = chap.getSignpost().iterator();
            while (signIter.hasNext()) {
                ChapterSign sign = signIter.next();
                if (chapterId.equals(sign.getDestinationId())) {
                    signIter.remove();
                }
            }
        }
     }
}

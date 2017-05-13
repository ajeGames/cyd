# Component Hierarchy

## Presentational
* **App** root component for all of this fun
* **Library** where you go to find a story
    * **Card Catalog** shows summaries of published stories on Story Cards
        * `cards: Array` an array of story summary cards
        * `onCardClick(storyKey: string)` is a callback to switch to the Reader and load the story with the given key
    * **Story Card** has enough information about a story to decide whether to select it, as well as a link into the Reader
        * `summary` has properties that describe the story
        * `onClick() is a callback to select the story`
* **Reader** where you read a story
    * **Title** summary information about the story: title, author, rating, etc.
    * **Chapter** for reading the title and prose of a chapter
    * **Signpost** options for where to go next, represented as Signs
        * `onSignClick(chapterId: string)` is a callback to change to the chapter with the given ID
    * **Sign** some teaser text, linked to next Chapter
        * `onClick()` is a callback to go to the destination chapter
    * **The End** special Signpost with options for starting over
        * `onStartOver()` return to first chapter of the story
        * `onReturnToLibrary()` go back to the library
* **Writing Desk** where authors write stories
    * ...coming soon...

## Container
* **Library Container** feeds data to Library, initiates searches (TBD when there are more than a few stories)
* **Reader Container** feeds data to Reader, initiates story and chapter fetching for items that have not been cached yet during the session
* **Writer Container** feeds data to Writing Desk.

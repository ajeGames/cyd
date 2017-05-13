# Reducer Design

## Actions
### Library
* **Fetch Story Summaries** -- application will contact story server and request summaries of published stories; allows UI to notify user that we are awaiting a response.
* **Fail Fetch Story Summaries** -- notify the user that something went wrong when fetching summaries
* **Load Story Summaries** -- once summaries are returns, make them available in the store
* **Load Story Summary** -- put story into the store

Future actions may include setting filters and preferences.

### Reader

TBD

## Reducers
### Library
* **Story Summaries** -- puts an array of story summaries into the store
* **Story Summary** -- puts a single story summary into the store

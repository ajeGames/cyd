const storiesDB = require('../../api/persistence/stories-db');
const logger = require('../../api/helpers/logger');

const storySummary = {
  title: 'Brand New Story',
  penName: 'Bubba Tester',
  about: 'This is a test.  This is only a test.',
  tagLine: 'This is a memorable tag line that makes you want to read the story.'
};

const callback = (data) => {
  logger.info(JSON.stringify(data, null, 2));
};
storiesDB.insertStory(storySummary, callback);

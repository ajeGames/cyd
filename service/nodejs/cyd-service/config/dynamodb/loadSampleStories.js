const fs = require('fs');
const admin = require('../../api/persistence/admin-db');

const sampleStories = JSON.parse(fs.readFileSync('sampleStories.json', 'utf8'));
if (sampleStories) {
  sampleStories.forEach(story => admin.loadFullStory(story));
}


export const storyThatStartsAtTheEnd = {
  summary: {
    storyKey: "o9s0toym",
    title: "The Cave",
    author: {
      id: "arn::109898",
      penName: "Bubba Gumpzzz"
    },
    tagLine: "You want to read this.",
    about: "Sometimes life compels you great things.  And sometimes you'd rather play this game.",
    firstChapter: "1000"
  },
  chapters: {
    "1000": {
      chapterId: "1000",
      versionStamp: "somekindofchecksumtodetectwhentherehasbeenachange",
      title: "The Cave",
      prose: "It's a nice day, so you decide to go for a walk.  As you stroll along, you see a clearing with an outcrop of rocks.  Something is unusual about these rocks, some blackness unlike the surrounding soil.  You notice that this is an opening to a cave.  It is dark inside, and you wonder how far it goes.\n\nWhat would you like to do?",
      signpost: []
    }
  }
};

export const shortStory = {
  summary: {
    storyKey: "uniquestorykey1",
    title: "Bye",
    versionStamp: "somekindofchecksumtodetectwhentherehasbeenachange",
    author: {
      id: "arn::1234",
      penName: "Little Miss Perfect"
    },
    tagLine: "tag line",
    about: "about",
    qualifiers: {
      rating: "5 stars",
      genre: [
        "mystery", "suspense", "sci-fi"
      ]
    },
    firstChapter: "uniquechapterkey1",
  },
  chapters: {
    uniquechapterkey1: {
      chapterId: "uniquechapterkey1",
      versionStamp: "somekindofchecksumtodetectwhentherehasbeenachange",
      title: "Danger Lies Within",
      prose: "It was a dark and stormy day when all of the animals went crazy and died.",
      signpost: [
        {
          destination: "uniquechapterkey2",
          teaser: "Take this path, sucker."
        },
        {
          destination: "uniquechapterkey3",
          teaser: "You are making the right choice, dupe."
        }
      ]
    },
    uniquechapterkey2: {
      versionStamp: "somekindofchecksumtodetectwhentherehasbeenachange",
      title: "The End",
      prose: "Now you have done it.  Good-bye.",
      signpost: []
    },
    uniquechapterkey3: {
      versionStamp: "somekindofchecksumtodetectwhentherehasbeenachange",
      title: "The End",
      prose: "The universe has decided to reclaim your matter.  The End (for you).",
      signpost: []
    }
  }
};

export const storyThatStartsAtTheEnd = {
  summary: {
    key: "o9s0toym",
    title: "The Cave",
    penName: "Bubba Gumpzzz",
    tagLine: "You want to read this.",
    about: "Sometimes life compels you great things.  And sometimes you'd rather play this game.",
    firstChapter: "1000"
  },
  chapters: {
    "1000": {
      title: "The Cave",
      prose: "It's a nice day, so you decide to go for a walk.  As you stroll along, you see a clearing with an outcrop of rocks.  Something is unusual about these rocks, some blackness unlike the surrounding soil.  You notice that this is an opening to a cave.  It is dark inside, and you wonder how far it goes.\n\nWhat would you like to do?",
      signpost: []
    }
  }
};

export const shortStory = {
  summary: {
    key: "uniquestorykey1",
    title: "Bye",
    penName: "Little Miss Perfect",
    tagLine: "tag line",
    about: "about",
    firstChapter: 1,
  },
  chapters: {
    1: {
      title: "Danger Lies Within",
      prose: "It was a dark and stormy day when all of the animals went crazy and died.",
      signpost: [
        {
          destination: 2,
          teaser: "Take this path, sucker."
        },
        {
          destination: 3,
          teaser: "You are making the right choice, dupe."
        }
      ]
    },
    2: {
      versionStamp: "somekindofchecksumtodetectwhentherehasbeenachange",
      title: "The End",
      prose: "Now you have done it.  Good-bye.",
      signpost: []
    },
    3: {
      versionStamp: "somekindofchecksumtodetectwhentherehasbeenachange",
      title: "The End",
      prose: "The universe has decided to reclaim your matter.  The End (for you).",
      signpost: []
    }
  }
};

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function Sign({ storyKey, sign, switchToChapter }) {
  return (
    <li>
      <Link to={`/reader/${ storyKey }/${ sign.destination }`}>
        { sign.teaser }
      </Link>
      <Button onClick={ switchToChapter(sign.destination) }>Go</Button>
    </li>
  );
}

Sign.propTypes = {
  storyKey: PropTypes.string.isRequired,
  sign: PropTypes.shape({
    destination: PropTypes.string,
    teaser: PropTypes.string,
  }).isRequired,
};

function TheEnd({ storyKey, switchToChapter }) {
  return (
    <div>
      <p>You are at the end of the line.</p>
      <ul>
        <li><Link to={`/story/${storyKey}`}>Return to Chapter One</Link></li>
        <li><Link to="/">Choose Another Story</Link></li>
      </ul>
    </div>
  );
}

TheEnd.propTypes = {
  storyKey: PropTypes.string.isRequired,
};

function SignPost({ storyKey, signs, switchToChapter }) {
  if (signs.length === 0) {
    return (<TheEnd storyKey={ storyKey } />);
  }
  return (
    <ul>
      {signs.map(sign =>
        <Sign
          key={ sign.destination }
          storyKey={ storyKey }
          sign={ sign }
          switchToChapter={ switchToChapter }
        />)}
    </ul>
  );
}

SignPost.propTypes = {
  storyKey: PropTypes.string.isRequired,
  signs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function Chapter({ storyKey, chapter, switchToChapter }) {
  return (
    <div className="container">
      <h2>{ chapter.title }</h2>
      <p>{ chapter.prose }</p>
      <hr />
      <SignPost
        storyKey={ storyKey }
        signs={ chapter.signpost }
        switchToChapter={ switchToChapter }
      />
    </div>
  );
}

Chapter.propTypes = {
  storyKey: PropTypes.string.isRequired,
  chapter: PropTypes.shape({
    title: PropTypes.string,
    prose: PropTypes.string,
    signpost: PropTypes.array,
  }).isRequired,
};

const Reader = ({ story, chapter, switchToChapter }) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="text-center panel-title">
        <b>{ story.title }</b> <em>by { story.author.penName }</em></h3>
    </div>
    <div className="panel-body">
      <Chapter
        storyKey={ story.storyKey }
        chapter={ chapter }
        switchToChapter={ switchToChapter }
      />
    </div>
  </div>
)

export default Reader;

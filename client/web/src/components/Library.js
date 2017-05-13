import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Card, CardTitle, CardText, CardSubtitle, Button
} from 'reactstrap';

const StoryCard = ({ story }) => (
  <Col sm="4">
    <Card block outline color="primary"
      className="text-center"
      style={{marginBottom: 2 + 'em', padding: 0.5 + 'em', border: 'solid 1px gray'}}>
      <CardTitle>
        <Link
          to={ `/reader/${ story.storyKey }` }
        >
          { story.title }
        </Link>
      </CardTitle>
      <CardSubtitle><em>by { story.author }</em></CardSubtitle>
      <CardText>{ story.about }</CardText>
      <Link
        className="btn btn-info"
        role="button"
        to={ `/reader/${ story.storyKey }` }
      >
        { story.tagLine }
      </Link>
    </Card>
  </Col>
);

const CardCatalog = ({ stories }) => {
  if (!stories || stories.length === 0) {
    return <h3>No stories found.</h3>;
  } else {
    return (
      <Container fluid>
        <Row>
          { stories.map((story) => <StoryCard key={ story.storyKey } story={ story } />) }
        </Row>
      </Container>
    )
  }
}

const Library = (props) => {
  let actionBar;
  if (props.loading) {
    actionBar = (
      <div>
        <p>
          Stories are loading. Please wait.
          <Button color="primary" onClick={ props.completeRefreshStories }>Complete</Button>
          <Button color="danger" onClick={ props.cancelRefreshStories }>Cancel</Button>
        </p>
        <hr />
      </div>
    )
  } else {
    actionBar = (
      <div>
        <p>Click to refresh list of stories. <Button color="primary" onClick={ props.refreshStories }>Refresh Stories</Button></p>
        <hr />
      </div>
    )
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="text-center panel-title">Welcome to the Library.</h3></div>
      <div className="panel-body">
        { actionBar }
        <CardCatalog stories={ props.summaries } />
      </div>
    </div>
  )
};

export default Library;

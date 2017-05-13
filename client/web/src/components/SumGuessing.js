import React from 'react';
import { Container, Row, Button } from 'reactstrap';

class SumGuessing extends React.Component {

  render() {
    return (
      <Container style={{marginTop: 5 + 'em'}}>
        <Row className="text-center">
          <h1>Guess My Number</h1>
          <form>
            <p>
              <input
                type="text"
                value={this.state.guess}
                onChange={this.handleInput}
              />
            </p>
            <p><Button onClick={this.checkGuess}>Guess</Button></p>
          </form>
          <h3>{this.state.message}</h3>
        </Row>
      </Container>
    );
  }
}

export default SumGuessing;

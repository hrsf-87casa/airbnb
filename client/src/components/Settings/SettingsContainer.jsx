import React from 'react';
import PropTypes from 'prop-types';

export default class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      container: {
        backgroundColor: 'white',
        height: '100vh',
      },
      tagline: {
        backgroundColor: 'green',
        height: '5vh',
      },
      profilePicture: {
        backgroundColor: 'yellow',
        height: '25vh',
      },
      profileInfo: {
        backgroundColor: 'red',
        height: '20vh',
      },
      miscInfo: {
        backgroundColor: 'orange',
        height: '30vh',
      },
      reviews: {
        backgroundColor: 'pink',
        height: '75vh',
      },
    };
    return (
      <Container fluid style={styles.container}>
        <Row>
          <Col className="tagline" style={styles.tagline}>
            Tagline goes here iowjeoiajfewajflkasjdflaj sdofj aofej alkwefjlkasj salkfj
          </Col>
        </Row>
        <Row>
          <Col xs="6" className="profilePicture" style={styles.profilePicture}>Profile Pic</Col>
          <Col xs="6" className="profileInfo" style={styles.profileInfo}>Location Joined and Bio</Col>
        </Row>
        <Row>
          <Col xs="6" className="miscInfo" style={styles.miscInfo}>Email, Phonenumber</Col>
          <Col xs="6" className="reviews" style={styles.reviews}>Reviews Component</Col>
        </Row>
      </Container>
    );
  }
}

// option to upload a file to database as profile picture
// option to set displayname if you choose which will render on the nav bar

/*
SettingsContainer.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
};
*/

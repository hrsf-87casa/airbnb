import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';

export default class ProfileTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      location: '',
      tagline: '',
      bio: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  updateProfile() {
    const { displayName, location, tagline, bio } = this.state;
    fetch('/api/updateprofile', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        displayName,
        location,
        tagline,
        bio,
      }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      })
      .catch(console.error);
  }

  render() {
    return (
      <Form>
        <br />
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label for="displayName" className="tabLabel">
                Display Name
              </Label>
            </Col>
            <Col xs="9">
              <Input
                type="text"
                name="displayName"
                id="displayName"
                placeholder="Enter a display name here"
                onChange={event => this.handleChange(event)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label for="location" className="tabLabel">
                Location
              </Label>
            </Col>
            <Col xs="9">
              <Input
                type="text"
                name="location"
                id="location"
                placeholder="Enter your location"
                onChange={event => this.handleChange(event)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label for="tagline" className="tabLabel">
                Tagline
              </Label>
            </Col>
            <Col xs="9">
              <Input
                type="text"
                name="tagline"
                id="tagline"
                placeholder="Enter your tagline"
                onChange={event => this.handleChange(event)}
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col xs="3">
              <Label for="bio" className="tabLabel">
                Biography
              </Label>
            </Col>
            <Col xs="9">
              <Input
                type="textarea"
                name="bio"
                id="bio"
                placeholder="Write a short bio"
                onChange={event => this.handleChange(event)}
              />
            </Col>
          </Row>
        </FormGroup>
        <button className="todo" onClick={() => this.updateProfile()}>
          Submit
        </button>
      </Form>
    );
  }
}

ProfileTab.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
};

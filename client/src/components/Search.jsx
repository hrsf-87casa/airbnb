import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Col } from 'reactstrap';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
    };
  }

  handleCityChange(event) {
    this.setState({ city: event.target.value });
  }

  handleStateChange(event) {
    this.setState({ state: event.target.value });
  }

  render() {
    const states = [
      'Please Select a State',
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Palau',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virgin Island',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];

    return (
      <Container>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1>
            <span className="search-brand-name">Aircasa</span>
            <div className="search-tagline">
              Book unique homes and experiences all over the world.
            </div>
          </h1>
          <FormGroup className="search-city-container">
            <Input
              type="city"
              name="city"
              placeholder="city"
              onChange={event => this.handleCityChange(event)}
            />
          </FormGroup>
          <FormGroup className="search-state-container">
            <Input
              className="state-select"
              type="select"
              name="state"
              value={this.state.state}
              onChange={event => this.handleStateChange(event)}
            >
              {states.map(state => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Link to={`listings/${this.state.state.toLowerCase()}--${this.state.city.toLowerCase()}`}>
            <Button className="search-button" color="primary">
              {' '}
              Search!{' '}
            </Button>
          </Link>
        </Col>
      </Container>
    );
  }
}

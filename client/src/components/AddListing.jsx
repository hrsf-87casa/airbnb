import React from 'react';
import {
  Button,
  Collapse,
  Form,
  FormGroup,
  Input,
  Label,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import Search from './Search.jsx';
import 'bootstrap/dist/css/bootstrap.css';

export default class AddListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_guests: '',
      bedrooms: 0,
      bathrooms: 0,
      name: '',
      description: '',
      summary: '',
      neighborhood: '',
      street_address: '',
      zip_code: '',
      city: '',
      state: '',
      cancellation_policy: '',
      nightly_price: '',
      pic_url: '',
      rating: '',
      listingAdded: false,
    };
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createListing() {
    /* CREATE TABLE `listings` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `num_guests` INTEGER NOT NULL,
  `bedrooms` INTEGER NOT NULL,
  `bathrooms` INTEGER NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `summary` VARCHAR(255) NULL DEFAULT NULL,
  `neighborhood` VARCHAR(50) NULL DEFAULT NULL,
  `street_address` VARCHAR(255) NOT NULL,
  `zip_code` INTEGER NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(25) NOT NULL,
  `cancellation_policy` VARCHAR(255) NOT NULL,
  `nightly_price` INTEGER NOT NULL,
  `pic_url` VARCHAR(255) NULL DEFAULT NULL,
  `rating` INTEGER NOT NULL,
  `host_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
); */
    // this will be a post to the backend to create a listing to listings/host
    // should contain an entire listing object
    // should get back a 200 for listing created
    // or a 500 for server error
  }

  createListing() {
    const {
      bedrooms,
      bathrooms,
      name,
      description,
      summary,
      neighborhood,
      street_address,
      zip_code,
      city,
      state,
      cancellation,
      nightly_price,
      pic_url,
      rating,
    } = this.state;
    if (bedrooms === '') {
      return this.setState({
        displayMessage: 'Login requires a username',
      });
    }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(resp =>
        (resp.status === 200
          ? this.setState({
            listingAdded: true,
          })
          : this.setState({
            displayMessage:
                  'This could only happen if the listing already exists. Is that a possibility?',
          })))
      .catch(console.error); // should be 500 only
  }

  render() {
    const styles = {
      body: {
        paddingTop: '40px',
        paddingBottom: '40px',
        maxWidth: '330px',
        padding: '15px',
        margin: '20 auto',
        textAlign: 'center',
      },
    };

    return (
      <div className="addListing" style={styles.body}>
        {this.state.listingAdded ? (
          <Redirect
            to={{ pathname: '/' }} // this will be the first page they see on login
          />
        ) : (
          <div style={styles.body}>
            <Form>
              <br />
              <br />
              <br />
              <br />
              <FormGroup>
                <Label for="propertyName">Property Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. casa slackk"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="num_guests">Number of Guests</Label>
                <Input
                  type="number"
                  name="num_guests"
                  id="num_guests"
                  placeholder="Choose a maximum capacity"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bathrooms">Number of Bathrooms</Label>
                <Input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  placeholder="e.g. 4 or 1.5"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bedrooms">Number of Bedrooms</Label>
                <Input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  placeholder="e.g. 4 or 1.5"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="neighborhood">Neighborhood</Label>
                <Input
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  placeholder="e.g. 'SOMA' or 'The Hood'"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="street_address">Street Address</Label>
                <Input
                  type="text"
                  name="street_address"
                  id="street_address"
                  placeholder="e.g. 1600 Pennsylvania Ave"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="zip_code">ZIP code</Label>
                <Input
                  type="number"
                  name="zip_code"
                  id="zip_code"
                  placeholder="e.g. 20500"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="e.g. Washington D.C."
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  type="text"
                  name="state"
                  id="state"
                  placeholder="e.g. California"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="chooseRating">Select your Cancellation Policy</Label>
                <Input
                  type="select"
                  name="cancellation_policy"
                  id="cancellation_policy"
                  onChange={event => this.handleChange(event)}
                >
                  <option />
                  <option>
                    Flexible (Cancel up to 24 hours before check in and get a full refund) (minus
                    service fees)
                  </option>
                  <option>
                    Moderate (Cancel up to 7 days before check in and get a 50% refund) (minus
                    service fees)
                  </option>
                  <option>Strict</option>
                  <option>Severe</option>
                  <option>Loan Shark</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="nightly_price">Price per Night</Label>
                <Input
                  type="number"
                  name="nightly_price"
                  id="zip_code"
                  placeholder="e.g. 69.99"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="pic_url">Choose a picture URL</Label>
                <Input
                  type="text"
                  name="pic_url"
                  id="pic_url"
                  placeholder="e.g. 20500"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="chooseRating">Rate your listing</Label>
                <Input
                  type="select"
                  name="rating"
                  id="listingRating"
                  onChange={event => this.handleChange(event)}
                >
                  <option />
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Describe your listing</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Describe your listing"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="summary">Summarize your listing</Label>
                <Input
                  type="textarea"
                  name="summary"
                  id="summary"
                  placeholder="Summarize your listing"
                  onChange={event => this.handleChange(event)}
                />
              </FormGroup>
              <Button color="primary">Submit</Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}

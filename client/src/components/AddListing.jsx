import React from 'react';
import {
  Button,
  Collapse,
  FormGroup,
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
      placeHolder: 'placeholder',
    };
  }



  createListing() {
    /*CREATE TABLE `listings` (
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
);*/
    //this will be a post to the backend to create a listing to listings/host
    //should contain an entire listing object
    //should get back a 200 for listing created 
    //or a 500 for server error


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
  }

  return (
    <div>
    
    <Form>
    <FormGroup>
      <Label for="exampleEmail">Email</Label>
      <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
    </FormGroup>
    <FormGroup>
      <Label for="examplePassword">Password</Label>
      <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
    </FormGroup>
    <FormGroup>
      <Label for="exampleSelect">Select</Label>
      <Input type="select" name="select" id="exampleSelect">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="exampleSelectMulti">Select Multiple</Label>
      <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">Text Area</Label>
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>
    <FormGroup>
      <Label for="exampleFile">File</Label>
      <Input type="file" name="file" id="exampleFile" />
      <FormText color="muted">
        This is some placeholder block-level help text for the above input.
        It's a bit lighter and easily wraps to a new line.
      </FormText>
    </FormGroup>
    <FormGroup tag="fieldset">
      <legend>Radio Buttons</legend>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="radio1" />{' '}
          Option one is this and that—be sure to include why it's great
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="radio1" />{' '}
          Option two can be something else and selecting it will deselect option one
        </Label>
      </FormGroup>
      <FormGroup check disabled>
        <Label check>
          <Input type="radio" name="radio1" disabled />{' '}
          Option three is disabled
        </Label>
      </FormGroup>
    </FormGroup>
    <FormGroup check>
      <Label check>
        <Input type="checkbox" />{' '}
        Check me out
      </Label>
    </FormGroup>
    <Button>Submit</Button>
  </Form>


    </div>
  )
}


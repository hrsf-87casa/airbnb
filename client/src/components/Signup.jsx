import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Search from './Search.jsx';
import 'bootstrap/dist/css/bootstrap.css';

export default class Signup extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      phoneNumber: '',
      email: '',
      successfulSignup: false,
      displayMessage: '',
    };
  }

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit() {
    //in here make the fetch
    // {username, password, phoneNumber, email}
    //should handle 200 success, 401 failed login, 500 database failure
    //only get userId and status code back
    let { username, password, phoneNumber, email } = this.state;
    if (username === '') {
      return this.setState({
        displayMessage: 'Loogin requires a username',
      });
    }
    if (password === '') {
      return this.setState({
        displayMessage: 'Loogin requires a passswoord',
      });
    }
    if (phoneNumber === '') {
      return this.setState({
        displayMessage: 'Loogin requires a phone number',
      });
    }
    if (email === '') {
      return this.setState({
        displayMessage: 'Loogin requires an email address',
      });
    }

    fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(
        (resp) =>
          resp.statusCode === 200
            ? this.setState({ successfulLogin: true })
            : this.setState({
                displayMessage: `Set the error here. resp.status?`,
              }), //should be 401 only
      )
      .catch(console.error); // should be 500 only
  }

  //todo: render displaymessage
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Enter your name"
            onChange={(event) => this.handleChange(event)}
          />
          <br />
          <input
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Enter your password"
            onChange={(event) => this.handleChange(event)}
          />
          <br />
          <input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="Enter your email address"
            onChange={(event) => this.handleChange(event)}
          />
          <br />
          <input
            type="text"
            name="phoneNumber"
            value={this.state.phoneNumber}
            placeholder="Enter your phone number"
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <input type="submit" />
      </form>
    );
  }
}

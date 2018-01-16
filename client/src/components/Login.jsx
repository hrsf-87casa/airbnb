import React from 'react';
import {
  Button,
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

export default class Login extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      successfulLogin: false,
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
    // {username, password}
    //should handle 200 success, 401 failed login, 500 database failure
    //only get userId and status code back
    let { username, password } = this.state;
    if (username === '') {
      return this.setState({
        displayMessage: 'Loogin requires a usenamed',
      });
    }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'content-type': 'application/JSON' },
    })
      .then(
        (resp) =>
          resp.statusCode === 200
            ? this.setState({
                successfulLogin: true,
                currentUser: resp.body.userId,
              }) //how to handle the userId that is sent in
            : this.setState({
                displayMessage: `Set the error here. resp.status?`,
              }), //should be 401 only
      )
      .catch(console.error); // should be 500 only
  }
  //todo: render dispplay message
  render() {
    return (
      <form>
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
        </label>
        <Button onClick={() => this.handleSubmit()} />
      </form>
    );
  }
}

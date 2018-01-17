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

export default class Signup extends React.Component {
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

  handleChange(event) {
    console.log('IN SIGNUP HANDLECHANGE');
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state[event.target.name]);
  }

  handleSubmit() {
    // in here make the fetch
    // {username, password, phoneNumber, email}
    console.log('The submit was pressed in Signup.jsx');
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
          resp.statusCode === 201
            ? this.setState({ successfulSignup: true })
            : this.setState({
                displayMessage: `Set the error here, Should be 409`,
              }),
      )
      .catch(console.error); // should be 500 only
  }

  //todo: render displaymessage!!
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
      <div className="signup-component" style={styles.body}>
        {this.state.successfulSignup ? (
          <Redirect to={{ pathname: `/login` }} />
        ) : (
          <form>
            <br />
            <br />
            <br />
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
            <br />
            <Button onClick={() => this.handleSubmit()}>Click to signup</Button>
          </form>
        )}
      </div>
    );
  }
}

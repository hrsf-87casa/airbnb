import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Sticky from 'react-stickynode';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    const styles = {
      nav: {
        height: '80px',
        padding: '0 0 0 0',
        margin: '0 0 0 0',
        borderBottom: '1px solid #e3e3e3',
      },
      logo: {
        height: '34px',
        width: '34px',
        objectFit: 'cover',
        paddingLeft: '20px',
        paddingRight: '50px',
      },

      navText: {
        fontFamily: 'Circular, "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '14px',
        fontWeight: '450',
        color: '#4a4a4a',
        lineHeight: '1.43',
        padding: '20px',
      },
    };
    return (
      <Sticky className="sticky navbar-container" id="navbar" innerZ={5}>
        <Navbar style={styles.nav} color="white" light expand="md">
          <Link style={styles.logo} to="/">
            <img className="navLogo" src="/assets/logo.png" alt="aircasa" />
          </Link>
          <Link style={{ color: 'black', textDecoration: 'none' }} to="/">
            <NavbarBrand>airbnb-casa</NavbarBrand>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {!this.props.userId ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/login">
                    <NavLink style={styles.navText}>Log In</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/signup">
                    <NavLink style={styles.navText}>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/host">
                    <NavLink style={styles.navText}>Host</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link to="/bookings">
                    <NavLink style={styles.navText}>Bookings</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="profile">
                    <NavLink style={styles.navText}>Profile</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/settings">
                    <NavLink style={styles.navText}>Settings</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink href="/logoff" style={styles.navText}>
                    Log Out
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </Sticky>
    );
  }
}

// conditional rendering depending on the current path you are in

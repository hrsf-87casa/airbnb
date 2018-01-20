import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Container, Row, Col } from 'reactstrap';

export default class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: {} };
    this.getProfileInfo = this.getProfileInfo.bind(this);
  }

  componentDidMount() {
    this.getProfileInfo();
  }

  getProfileInfo() {
    fetch('/api/user/profile', {
      credentials: 'include',
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({ userInfo: data });
      })
      .catch(console.error);
  }

  render() {
    const { userInfo } = this.state;
    const styles = {
      superContainer: {
        backgroundColor: '#ECECEC',
        height: '100vh',
      },
      wrapper: {
        backgroundColor: '#ECECEC',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridAutoRows: 'minmax(auto)',
        // gridTemplateRows: '40px 100px 40px',
        margin: '0 100px 0 100px',
        alignItems: 'start',
        height: '100vh',
      },
      header: {
        gridColumn: 'span 8',
        height: '30vh',
        objectFit: 'cover',
      },
      menu: {
        gridColumn: 'span 3',
        height: '50vh',
        verticalAlign: 'middle',
        justifySelf: 'center',
      },
      profilePicture: {
        backgroundPosition: 'center',
        border: '3px',
        backgroundRepeat: 'no-repeat',
        height: '60vh',
        width: '22vw',
        marginTop: '-41vh',
        objectFit: 'cover',
      },
      headerPicture: {
        backgroundPosition: 'right',
        height: '30vw',
        width: '90vw',
        objectFit: 'cover',
      },
      profileInfo: {
        backgroundColor: 'white',
        position: 'absolute',
        width: '22vw',
        margin: '0 0 0 0',
        borderRadius: '4px',
        boxShadow:
          '5px 8px 12px 5px rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        height: '30vh',
        textAlign: 'center',
        padding: '2px 2px 2px 2px',
        overflowWrap: 'break-word',
      },
      content: {
        marginTop: '7vh',
        gridColumn: '4 / 9',
        height: '80vh',
      },
      footer: {
        gridColumn: '1 / 9',
      },
      profileText: {
        fontSize: '2vw',
        color: '#4e2461',
      },
      taglineText: {
        marginTop: '-3vh',
        gridColumn: '7 / 9',
        fontSize: '8vw',
        color: '#e1e2e1',
      },
      text: {
        color: '#e1e2e1',
        fontisze: '3vw',
      },
    };

    return (
      <div className="superContainer" style={styles.superContainer}>
        <div className="wrapper" style={styles.wrapper}>
          <div className="header" style={styles.header}>
            <img
              className="headerPicture"
              src={userInfo.picture}
              style={styles.headerPicture}
            />
          </div>
          <div style={styles.taglineText}>
            <h3 style={styles.text}>{userInfo.tagline}</h3>
            <h3 style={styles.text}>{userInfo.location}</h3>
          </div>
          <div className="menu" style={styles.menu}>
            <div className="profileInfo" style={styles.profileInfo}>
              <h1 style={styles.profileText}>
                {userInfo.displayName || userInfo.name}
              </h1>
              <h2 style={{ color: '#4e2461', fontSize: '1vw' }}>Biography:</h2>
              <p style={styles.bio}>{userInfo.bio}</p>
            </div>
            <img
              className="picture"
              src={userInfo.picture}
              style={styles.profilePicture}
            />
          </div>
          <div className="content" style={styles.content}>
            <br />
            <h1 style={{ paddingLeft: '1vw' }}> Reviews:</h1>
          </div>
          <div className="footer" style={styles.footer} />
        </div>
      </div>
    );
  }
}

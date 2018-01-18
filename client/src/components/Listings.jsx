import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import ListingEntry from './ListingEntry.jsx';

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    fetch('/api/listings/search', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        city: this.props.match.params.city,
        state: this.props.match.params.state,
      }),
    })
      .then(resp => resp.json())
      .then((data) => {
        const splitResults = [];
        for (let i = 0; i < data.length; i += 3) {
          splitResults.push(data.slice(i, i + 3));
        }
        this.setState({ listings: splitResults });
        console.log(data.length);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <center>
          <h3>
            Listings for {this.props.match.params.city}, {this.props.match.params.state}
          </h3>
        </center>
        <Container>
          {this.state.listings.map(listing => (
            <Row>
              <Col>
                <ListingEntry listing={listing[0]} key={listing[0].id} />
              </Col>
              <Col>
                {listing[1] ? <ListingEntry listing={listing[1]} key={listing[1].id} /> : ''}
              </Col>
              <Col>
                {listing[2] ? <ListingEntry listing={listing[2]} key={listing[2].id} /> : ''}
              </Col>
            </Row>
          ))};
        </Container>
      </div>
    );
  }
}

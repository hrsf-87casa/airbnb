import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle, CardText, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ListingEntryDetails from './ListingEntryDetails.jsx';

export default class ListingEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listing } = this.props;
    return (
      <Card>
        <Link
          to={{
            pathname: `/listings/${listing.state}--${listing.city}/${listing.id}`,
            state: { listing },
          }}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <CardImg
            top
            height="180px"
            width="256px"
            style={{ objectFit: 'cover' }}
            src={listing.pic_url}
            alt={`${listing.name} img`}
          />
          <CardBody>
            <CardTitle>{listing.name}</CardTitle>
          </CardBody>
        </Link>
        <CardBody>
          <CardSubtitle>
            {listing.city}, {listing.state}
          </CardSubtitle>
        </CardBody>
      </Card>
    );
  }
}

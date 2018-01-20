import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import moment from 'moment';

export default class PastTripEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.cancelBooking = this.cancelBooking.bind(this);
  }

  toggle(event) {
    this.setState({
      modal: !this.state.modal,
    });
  }

  cancelBooking(event) {
    fetch('/api/bookings/cancel', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        bookingId: this.props.booking.id,
      }),
      headers: { 'content-type': 'application/json' },
    })
      .then(this.props.getCurrentBookings())
      .catch(console.error);
  }

  render() {
    const { listing, booking } = this.props;
    return (
      <div className="trip-container">
        <div className="trip-schedule">
          <div className="details-city">{listing.city}</div>
          <div>
            <Link
              to={{
                pathname: `/listings/${listing.state}--${listing.city}/${listing.id}`,
                state: { listing },
              }}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div className="listing-name"> {listing.name} </div>
            </Link>
            <div className="row">
              <div className="row dates col-md-12 col-lg-7">
                <div className="col-sm-5 text-left check-in-section">
                  <div className="check-in-out-date">
                    <strong>{moment(booking.start).format('MMM Do YYYY')}</strong>
                  </div>
                  <div className="text-muted check-in-out-time">
                    <strong>CHECK IN FLEXIBLE</strong>
                  </div>
                </div>
                <div className="col-sm-2 text-center check-in-out-delimiter">→</div>
                <div className="col-sm-5 pull-right check-out-section">
                  <div className="check-in-out-date">
                    <div className="check-in">
                      <strong>{moment(booking.end).format('MMM Do YYYY')}</strong>
                    </div>
                    <div className="text-muted check-in-out-time">
                      <strong>CHECK OUT FLEXIBLE</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="trip-entry-hr" />
          <Link
            to={{
              pathname: `/listings/${listing.state}--${listing.city}/${listing.id}`,
              state: { listing },
            }}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="pin">
              <div
                className="listing-image-container"
                style={{
                  backgroundImage: `url(${listing.pic_url})`,
                }}
              />
            </div>
          </Link>
        </div>
        <div className="trip-button-container col-lg-4 col-md-12 col-sm-12 action">
          <Button style={{ background: 'rgb(255, 90, 95)' }} onClick={this.toggle}>
            Cancel Booking
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Cancel Booking</ModalHeader>
            <ModalBody>
              Are you sure you want to cancel? Your host has a{' '}
              {this.props.listing.cancellation_policy} cancellation policy, and we cannot guarantee
              a full refund.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.cancelBooking}>
                Yes, I still want to cancel
              </Button>{' '}
              <Button color="secondary" onClick={this.toggle}>
                No, I made a mistake!
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

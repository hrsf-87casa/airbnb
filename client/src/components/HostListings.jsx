import React from 'react';
import ReactDOM from 'react-dom';
import ListingEntry from './ListingEntry.jsx';

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      hasListings: false,
    };
    console.log(this.props);
    this.createListing = this.createListing.bind(this);
  }

  componentWillMount() {
    console.log('IN COMOPONENT WILL MOUNT');
    this.createListing();
  }

  createListing() {
    // surely I could use a loop to check, not sure with destructuring
    console.log('IN CREATELISTING');
    fetch('/api/listings')
      .then(resp => resp.json())
      .then(resp =>
        this.setState({
          hasListings: true,
          listings: resp,
        }))
      .catch(console.error); // should be 500 only
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h3>
          <u>All listings</u>
        </h3>
        {this.state.hasListings ? (
          this.state.listings.map(listing => (
            <ListingEntry
              listing={listing}
              key={listing.id}
              state={listing.state}
              city={listing.city}
            />
          ))
        ) : (
          <h1 color="alert"> Y U NO OWN LISTING </h1>
        )}
      </div>
    );
  }
}

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Listings from './Listings.jsx';
import ListingEntryDetails from './ListingEntryDetails.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Listings} />
          <Route path="/listings/:id" component={ListingEntryDetails} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    );
  }
}

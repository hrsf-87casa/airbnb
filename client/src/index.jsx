import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
<<<<<<< HEAD
=======
import Listings from './components/Listings.jsx';
>>>>>>> (Refactor) Merge conflicts
import { BrowserRouter, Route, BrowserHistory, Link } from 'react-router-dom';
import UserComponent from './components/UserComponent.jsx';
import ListingEntryDetails from './components/ListingEntryDetails.jsx';
import Results from './components/Results.jsx';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Main from './components/Main.jsx';
<<<<<<< HEAD
=======
import AddListing from './components/AddListing.jsx';
>>>>>>> (Refactor) Merge conflicts

ReactDOM.render(
  <BrowserRouter history={BrowserHistory}>
    <div>
      <Route path="/" component={Main} />
      <Route exact path="/" component={App} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route path="/bookings" component={UserComponent} />
<<<<<<< HEAD
      <Route exact path="/listings/:state--:city" component={Results} />
=======
      <Route exact path="/listings/:state--:city" component={Listings} />
>>>>>>> (Refactor) Merge conflicts
      <Route path="/listings/:state--:city/:id" component={ListingEntryDetails} />
    </div>
  </BrowserRouter>,
  document.getElementById('app'),
);

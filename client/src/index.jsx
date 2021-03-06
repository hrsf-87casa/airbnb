import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, BrowserHistory } from 'react-router-dom';
import Bookings from './components/Bookings.jsx';
import ListingEntryDetails from './components/ListingEntryDetails.jsx';
import Results from './components/Results.jsx';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Navigation from './components/Navigation.jsx';
import HostListings from './components/HostListings.jsx';
import AddListing from './components/AddListing.jsx';
import SettingsContainer from './components/Settings/SettingsContainer.jsx';
import ProfileContainer from './components/Profile/ProfileContainer.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: false,
    };
  }
  componentDidMount() {
    fetch('/api/bookings/list', { credentials: 'include' }).then(resp => (resp.status === 200 ? this.setState({ userId: true }) : undefined));
  }
  setUserId(val) {
    this.setState({ userId: val });
  }
  render() {
    return (
      <BrowserRouter history={BrowserHistory}>
        <div>
          <Route
            path="/"
            component={props => <Navigation {...props} userId={this.state.userId} />}
          />
          <Route exact path="/" component={App} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/login"
            render={props => <Login {...props} setUserId={e => this.setUserId(e)} />}
          />
          <Route path="/bookings" component={Bookings} />
          <Route exact path="/listings/:state--:city" component={Results} />
          <Route path="/listings/:state--:city/:id" component={ListingEntryDetails} />
          <Route path="/host" component={AddListing} />
          <Route path="/settings" component={SettingsContainer} />
          <Route path="/profile" component={ProfileContainer} />
          <Route exact path="/listings/hosted" component={HostListings} />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

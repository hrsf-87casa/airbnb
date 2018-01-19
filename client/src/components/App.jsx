import React from 'react';
import Search from './Search.jsx';
import { Container } from 'reactstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app-container">
        <div className="mainSearch-conatiner">
          <Search search={this.search} setSearchQuery={this.setSearchQuery} />
        </div>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    );
  }
}

// option to upload a file to database as profile picture
// option to set displayname if you choose which will render on the nav bar



Settings.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
};

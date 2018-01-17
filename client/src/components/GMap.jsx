import React, { Component } from 'react';
// import API from './../../../api/env.js';
import GoogleMapReact from 'google-map-react';

export default class GMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latLong: this.props.latLong || { lat: 42.2828747, lng: -71.13467840000001 },
      zoom: 15,
      apiKey: '',
      style: {
        width: '100vw',
        height: '60vh',
      },
    };
  }

  render() {
    return (
      <div className="google-map" style={this.state.style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.state.apiKey }}
          defaultCenter={this.state.latLong}
          defaultZoom={this.state.zoom}
          defaultOptions={{
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false,
          }}
          disableDefaultUI
        >
          <MapContainer latLong={this.state.latLong} />
        </GoogleMapReact>
      </div>
    );
  }
}

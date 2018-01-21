import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default class GMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latLong: { lat: Number(1), lng: Number(2) },
      lat: null,
      lng: null,
      zoom: 15,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lat: Number(nextProps.lat), lng: Number(nextProps.lng) });
  }

  render() {
    return (
      <div className="gmap-container" style={this.state.style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA9TuRPfrcICY2LU4Nzys6-jq7yfWs2k9A' }}
          defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
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
          <div className="gmap-circle" lat={this.state.lat} lng={this.state.lng} />
        </GoogleMapReact>
        Exact location information is provided after a booking is confirmed.
      </div>
    );
  }
}

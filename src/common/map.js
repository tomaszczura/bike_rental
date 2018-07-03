import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

export const CustomGoogleMap = withGoogleMap(props =>
  <GoogleMap
    {...props}
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    {props.marker && <Marker position={{ lat: props.marker.lat, lng: props.marker.lng }}/>}
  </GoogleMap>);

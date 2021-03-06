import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

export const CustomGoogleMap = withGoogleMap(props =>
  <GoogleMap
    {...props}
    defaultZoom={10}
    defaultCenter={props.defaultCenter || { lat: 50.049683, lng: 19.944544 }}>
    {props.marker && <Marker position={{ lat: props.marker.get('lat'), lng: props.marker.get('lng') }}/>}
  </GoogleMap>);

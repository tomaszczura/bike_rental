/* eslint-disable react/prop-types */
import React from 'react';
import StarRatings from 'react-star-ratings';

export const RateStars = (props) => (
  <div>
    <StarRatings
      {...props}
      starRatedColor='#388E3C'
      starEmptyColor='#C8E6C9'
      starHoverColor='#4CAF50'
      numberOfStars={5}
      name='rating'/>
    {props.count && props.count > 0 ? <span>&nbsp;({props.count})</span> : null}
  </div>
);

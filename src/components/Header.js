import React from 'react';

export default function Header() {
  return (
    <div className="container text-center">
      <h1>
        <i className="fa fa-map-marker" aria-hidden="true" />
        <i className="fa fa-glass" aria-hidden="true" />
        <i className="fa fa-beer" aria-hidden="true" />
        &nbsp;
        BarHop
      </h1>
      <h4>Down to party tonight? Check out the nightlife around you!</h4>
    </div>
  );
}

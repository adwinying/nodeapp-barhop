import React from 'react';

export default function Footer() {
  return (
    <div className="container text-center">
      <footer>
        <p>
          BarHop webapp made for &nbsp;
          <a href="//www.freecodecamp.com/challenges/build-a-nightlife-coordination-app">
            <i className="fa fa-free-code-camp" aria-hidden="true" />
            freeCodeCamp
          </a>
          . Powered by MERN stack and &nbsp;
          <i className="fa fa-yelp" aria-hidden="true" />
          Yelp Fusion API. Build by &nbsp;
          <a href="//iadw.in">Adwin</a>.
        </p>
      </footer>
    </div>
  );
}

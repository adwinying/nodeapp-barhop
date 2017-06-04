import React from 'react';

export default function Footer() {
  return (
    <div className="container text-center">
      <footer>
        <p>
          BarHop webapp made for &nbsp;
          <a href="//www.freecodecamp.com/challenges/build-a-nightlife-coordination-app">
            <i className="fa fa-free-code-camp" aria-hidden="true" />
            &nbsp;freeCodeCamp
          </a>. <br/>
          Powered by MERN stack and &nbsp;
          <i className="fa fa-yelp" aria-hidden="true" />
          &nbsp;Yelp Fusion API. <br/>
          Build by <a href="//iadw.in">Adwin</a>.
        </p>
      </footer>
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

import '../css/searchbar.css';

const SearchBar = ({ location, onChange, onSubmit }) => (
  <div className="container">
    <form className="form-horizontal" onSubmit={onSubmit}>
      <div className="form-group">
        <div className="col-xs-9">
          <input
            type="text"
            className="form-control"
            placeholder="Where you at?"
            value={location}
            onChange={e => onChange(e.target.value)}
          />
        </div>
        <div className="col-xs-3">
          <button type="submit" className="btn btn-primary">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  </div>
);

SearchBar.propTypes = {
  location: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

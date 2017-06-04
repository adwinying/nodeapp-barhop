import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPlaces, userInput } from '../actions/placeActions';

import Header from './Header';
import SearchBar from './SearchBar';
import Footer from './Footer';

import '../css/main.css';

class App extends Component {

  handleUserInput = (inputVal) => {
    this.props.dispatch(userInput(inputVal));
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { dispatch, location } = this.props;
    localStorage.setItem('location', location);
    dispatch(fetchPlaces(location));
  }

  render() {
    const { location, isFetching } = this.props;

    return (
      <div>
        <Header />
        <SearchBar
          location={location}
          onChange={this.handleUserInput}
          onSubmit={this.handleFormSubmit}
        />
        {isFetching &&
          <div className="loading text-center">
            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
            <span className="sr-only">Loading...</span>
          </div>
        }
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { location, isFetching } = state.place;
  return {
    location,
    isFetching,
  };
};

export default connect(mapStateToProps)(App);

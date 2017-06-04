import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Place from './Place';

import { chkLoggedIn } from '../actions/userActions';

import missingImg from './missing.jpg';

class PlaceList extends Component {
  componentWillMount() {
    this.props.dispatch(chkLoggedIn());
  }

  handleClick = (placeId, isGoing) => {
    const { isLoggedIn } = this.props;
    console.log(placeId, isGoing);
    // TODO: process click
    if (!isLoggedIn) {
      window.location.replace('//localhost:3100/api/auth/login');
    }
  }

  render() {
    const { places, user, isLoggedIn } = this.props;

    const placeNodes = places.map((place) => {
      let isGoing = false;
      // TODO: process rating stuff
      if (isLoggedIn) {
        if (place.attendees.indexOf(user.userId) !== -1) {
          isGoing = true;
        }
      }

      return (
        <Place
          key={place.id}
          id={place.id}
          name={place.name}
          url={place.url}
          imageUrl={place.imageUrl === '' ? missingImg : place.imageUrl}
          location={place.location}
          price={place.price}
          rating={place.rating}
          attendeeCount={place.attendees.length}
          onClick={this.handleClick}
          isGoing={isGoing}
        />
      );
    });

    return (
      <div className="container place-list-wrapper">
        {placeNodes}
      </div>
    );
  }
}

PlaceList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    attendees: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    userId: PropTypes.number,
    displayName: PropTypes.string,
    username: PropTypes.string,
    __v: PropTypes.number,
  }),
  dispatch: PropTypes.func.isRequired,
};

PlaceList.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => {
  const { places } = state.place;
  const { isLoggedIn, user } = state.user;

  return {
    places,
    isLoggedIn,
    user,
  };
};

export default connect(mapStateToProps)(PlaceList);

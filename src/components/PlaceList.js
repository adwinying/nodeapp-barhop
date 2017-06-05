import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Place from './Place';

import { joinPlace } from '../actions/placeActions';
import { chkLoggedIn } from '../actions/userActions';

import missingImg from './missing.jpg';

class PlaceList extends Component {
  componentWillMount() {
    this.props.dispatch(chkLoggedIn());
  }

  handleClick = (placeId, isGoing, index) => {
    const { isLoggedIn, dispatch } = this.props;
    if (!isLoggedIn) {
      console.log(process.env.ENV);
      if (process.env.NODE_ENV === 'development') {
        window.location = '//localhost:3100/api/auth/login';
      } else {
        window.location = '//barhop.nodeapp.iadw.in/api/auth/login';
      }
    } else {
      const { userId } = this.props.user;
      dispatch(joinPlace(userId, placeId, !isGoing, index));
    }
  }

  render() {
    const { places, user, isLoggedIn, isJoining } = this.props;

    const placeNodes = places.map((place, index) => {
      let isGoing = false;
      const rating = [];

      if (isLoggedIn) {
        if (place.attendees.indexOf(user.userId) !== -1) {
          isGoing = true;
        }
      }

      for (let i = 1; i <= place.rating; i += 1) {
        rating.push(<i className="fa fa-star" aria-hidden="true" key={i} />);
      }

      if (place.rating !== parseInt(place.rating, 10)) {
        rating.push(<i className="fa fa-star-half" aria-hidden="true" key="asd" />);
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
          rating={rating}
          attendeeCount={place.attendees.length}
          onClick={this.handleClick}
          isGoing={isGoing}
          isJoining={isJoining}
          index={index}
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
  isJoining: PropTypes.bool.isRequired,
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
  const { places, isJoining } = state.place;
  const { isLoggedIn, user } = state.user;

  return {
    places,
    isLoggedIn,
    isJoining,
    user,
  };
};

export default connect(mapStateToProps)(PlaceList);
import React from 'react';
import PropTypes from 'prop-types';

const Place = ({
  id,
  name,
  url,
  imageUrl,
  location,
  price,
  rating,
  attendeeCount,
  onClick,
  isGoing,
  isJoining,
  index,
}) => (
  <div className="well">
    <div className="row">
      <div className="col-xs-6 col-xs-offset-3 col-sm-4 col-sm-offset-0">
        <div
          className="place-img"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
      <div className="col-xs-7 col-sm-5">
        <h3>
          <a href={url}>{name}</a>
        </h3>
        <p>
          <i>{location}</i>
        </p>
        <p>
          {rating}&ensp;|&ensp;{price}
        </p>
      </div>
      <div className="col-xs-5 col-sm-3">
        <div className="place-status text-center">
          <h4>{attendeeCount} Going</h4>
        </div>
        <button
          className={isJoining ? 'btn btn-success disabled' : 'btn btn-success'}
          onClick={() => { onClick(id, isGoing, index); }}
        >{isJoining ? 'PROCESSING..' : isGoing ? 'JOINED' : 'JOIN'}</button>
      </div>
    </div>
  </div>
);

Place.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  rating: PropTypes.arrayOf(PropTypes.element).isRequired,
  attendeeCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isGoing: PropTypes.bool.isRequired,
  isJoining: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default Place;

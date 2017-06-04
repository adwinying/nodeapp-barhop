import axios from 'axios';

export const fetchPlaces = location => (dispatch) => {
  dispatch({ type: 'FETCHING_PLACES' });

  axios.get(`/api/place/list?location=${location}`)
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: 'FETCH_PLACES_FULFILLED',
          payload: response.data.places,
        });
      } else {
        console.error(response.data.message);

        dispatch({ type: 'FETCH_PLACES_REJECTED' });
      }
    })
    .catch((err) => {
      console.error(err);

      dispatch({ type: 'FETCH_PLACES_REJECTED' });
    });
};

export const userInput = inputVal => ({
  type: 'USER_INPUT',
  payload: inputVal,
});

export const joinPlace = (userId, id, attend, index) => (dispatch) => {
  dispatch({ type: 'JOINING_PLACE' });

  axios.patch('/api/place/join', { userId, id, attend })
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: 'JOIN_PLACE_FULFILLED',
          payload: {
            place: response.data.place,
            index,
          },
        });
      } else {
        console.error(response.data.message);
        dispatch({ type: 'JOIN_PLACE_REJECTED' });
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: 'JOIN_PLACE_REJECTED' });
    });
};

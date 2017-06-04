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
        dispatch({
          type: 'FETCH_PLACES_REJECTED',
          payload: response.data.message,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: 'FETCH_PLACES_REJECTED',
        payload: err,
      });
    });
};

export const userInput = inputVal => ({
  type: 'USER_INPUT',
  payload: inputVal,
});

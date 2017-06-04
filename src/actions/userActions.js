import axios from 'axios';

export const chkLoggedIn = () => (dispatch) => {
  axios.get('/api/auth/check')
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: 'LOGGED_IN',
          payload: response.data.user,
        });
      } else {
        dispatch({
          type: 'NOT_LOGGED_IN',
        });
      }
    });
};

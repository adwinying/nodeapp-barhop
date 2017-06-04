const initState = {
  isLoggedIn: false,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'NOT_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: false,
      };

    case 'LOGGED_IN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    default:
      return state;
  }
}

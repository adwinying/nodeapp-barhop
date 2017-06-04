const initState = {
  places: [],
  isFetching: false,
  error: false,
  location: localStorage.getItem('location') || '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case 'FETCHING_PLACES':
      return {
        ...state,
        isFetching: true,
      };

    case 'FETCH_PLACES_FULFILLED':
      return {
        ...state,
        isFetching: false,
        places: action.payload,
      };

    case 'FETCH_PLACES_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    case 'USER_INPUT':
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
}

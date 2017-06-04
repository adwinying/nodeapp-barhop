const initState = {
  places: [],
  isFetching: false,
  error: null,
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
        error: action.payload,
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

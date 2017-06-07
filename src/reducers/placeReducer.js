const initState = {
  places: [],
  placeTarget: '',
  isFetching: false,
  isJoining: false,
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
    case 'JOIN_PLACE_REJECTED':
      return {
        ...state,
        isFetching: false,
        isJoining: false,
        error: true,
      };

    case 'USER_INPUT':
      return {
        ...state,
        location: action.payload,
      };

    case 'JOINING_PLACE':
      return {
        ...state,
        isJoining: true,
        targetPlace: action.payload,
      };

    case 'JOIN_PLACE_FULFILLED':
      return {
        ...state,
        isJoining: false,
        places: [
          ...state.places.slice(0, action.payload.index),
          {
            ...state.places[action.payload.index],
            attendees: action.payload.place.attendeeIds,
          },
          ...state.places.slice(action.payload.index + 1),
        ],
      };

    default:
      return state;
  }
}

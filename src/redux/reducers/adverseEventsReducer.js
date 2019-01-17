const adverseEventsReducer = (state = [], action) => {
  // console.log('in adverse events reducer', action.payload);
  switch (action.type) {
    case 'SET_ADVERSE_EVENT':
      return action.payload;
    default:
      return state;
  }
};

// adverseEvents will be on the redux state at:
// state.adverseEvents
export default adverseEventsReducer;
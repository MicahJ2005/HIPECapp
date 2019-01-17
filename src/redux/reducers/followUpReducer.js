const followUpReducer = (state = {}, action) => {
  // console.log('in post op reducer');
  switch (action.type) {
    case 'SET_FOLLOW_UP':
      return action.payload;
    default:
      return state;
  }
};

// followUp will be on the redux state at:
// state.followUp
export default followUpReducer;
const operativeHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_INDIVIDUAL_OPERATIVE_HISTORY':
            return action.payload;
        default:
            return state;
    }
  };
  
  
  export default operativeHistoryReducer;
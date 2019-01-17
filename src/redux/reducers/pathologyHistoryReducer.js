const pathologyHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_INDIVIDUAL_PATHOLOGY_HISTORY':
            return action.payload;
        default:
            return state;
    }
  };
  
  
  export default pathologyHistoryReducer;
const primaryTumorReducer = (state = [], action) => {
    // console.log('inside primaryTumorReducer');
    switch (action.type) {
      case 'SET_INIT_VALUES':
        return action.payload;
        case 'UPDATE_INIT_FIELDS':
        return action.payload
      default:
        return state;
    }
  };
  
  
  export default primaryTumorReducer;
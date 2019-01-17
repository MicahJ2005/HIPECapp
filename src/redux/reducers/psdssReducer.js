const psdssReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INITIAL_DATA_FOR_PSDSS':
            return action.payload;
        default:
            return state;
    }
  };
  
  
  export default psdssReducer;
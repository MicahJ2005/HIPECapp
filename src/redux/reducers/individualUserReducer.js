const individualUserReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_INDIVIDUAL_USER':
            return action.payload;
        default:
            return state;
    }
  };
  
  
  export default individualUserReducer;
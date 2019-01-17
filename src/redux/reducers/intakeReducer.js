const intakeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INITAL_DATA_FOR_INTAKE':
            return action.payload;
        default:
            return state;
    }
  };
  
  
  export default intakeReducer;
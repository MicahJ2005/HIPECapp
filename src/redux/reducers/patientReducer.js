const patientReducer = (state = [], action) => {
    switch (action.type) {
      case 'FIND_PATIENT':
        return {patientSearch: action.payload};
      case 'DROP_PATIENT_RESULT':
        return {patientSearch: ''};
      case 'SET_PATIENT_RESULT':
        return {patient: action.payload};
      case 'ADD_PATIENT':
        return {patient: action.payload};
      case 'LAST_PATIENT_ID_PLUS_ONE':
        return {patient: {newPatientId: action.payload}}
      case 'SET_PATIENT':
        return action.payload;
      
      default:
        return state;
    }
    // return state;
  };
  
  // user will be on the redux state at:
  // state.user
  export default patientReducer;
  
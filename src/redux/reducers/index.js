import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import dropdownOptions from './dropdownOptionsReducer';
import patientReducer from './patientReducer';
import postOp from './postOpReducer';
import adverseEvents from './adverseEventsReducer';
import followUp from './followUpReducer';
import followUpHistory from './followUpHistoryReducer';
import allUsersReducer from './allUsersReducer';
import individualUserReducer from './individualUserReducer';
import pathologyHistoryReducer from './pathologyHistoryReducer';
import operativeHistoryReducer from './operativeHistoryReducer';
import pciReducer from './pciReducer';
import primaryTumorReducer from './primaryTumorReducer';
import intakeReducer from './intakeReducer';
import psdssReducer from './psdssReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  dropdownOptions,
  patientReducer,
  postOp, // will contain post op information for patient_id
  followUp, // will contain follow up information for patient_id
  followUpHistory, // will contain recurrence information for followup_id
  adverseEvents, // will contain adverse events for patient_id
  allUsersReducer,
  individualUserReducer,
  pathologyHistoryReducer,
  operativeHistoryReducer,
  pciReducer,
  primaryTumorReducer,
  intakeReducer,
  psdssReducer,
});

export default rootReducer;

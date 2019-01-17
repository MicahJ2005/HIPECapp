import { put, takeLatest , call } from 'redux-saga/effects';
import axios from 'axios';


function* selectProfile(action) {
    try {
        const response = yield call(axios.get, `/getIndividualProfile/${action.payload.userID}`)
        yield put({ type: 'GET_INDIVIDUAL_USER', payload: response.data })
        
        
      }
      catch (error) {
        console.log('error with getting request', error);
        
      }
}



function* findUserProfileSaga() {
  yield takeLatest('FIND_USER_PROFILE', selectProfile);
  
}

export default findUserProfileSaga;
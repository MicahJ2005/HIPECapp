import { put, takeLatest , call } from 'redux-saga/effects';
import axios from 'axios';


function* pathologyHistory(action) {
    try {
        const response = yield call(axios.get, `/getPathologyHistory/${action.payload}`)
        yield put({ type: 'GET_INDIVIDUAL_PATHOLOGY_HISTORY', payload: response.data })
        
        
      }
      catch (error) {
        console.log('error with getting reques', error);
        
      }
}



function* getPathologyHistorySaga() {
  yield takeLatest('GET_PATHOLOGY_HISTORY', pathologyHistory);
  
}

export default getPathologyHistorySaga;
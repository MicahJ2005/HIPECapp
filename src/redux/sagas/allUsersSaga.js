import { put, takeLatest , call } from 'redux-saga/effects';
import axios from 'axios';


function* getAllUsers(action) { 
    try {
        const response = yield call(axios.get, `/getAllUsers`)
        yield put(({ type: 'SET_ALL_USERS', payload: response.data}))
        
      }
      catch (error) {
        console.log('error with getting reques', error);
        
      }
}

function* getAllUsersSaga() {
  yield takeLatest('RENDER_ALL_USERS', getAllUsers);
  
}

export default getAllUsersSaga;
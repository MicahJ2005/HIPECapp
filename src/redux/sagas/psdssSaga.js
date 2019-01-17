import { takeLatest , call, put } from 'redux-saga/effects';
import axios from 'axios';


function* getInitalValuesForPSDSS(action) {     
    try {
        const response = yield axios.get(`/api/psdss/${action.payload}`);
        yield put({type: 'SET_INITIAL_DATA_FOR_PSDSS', payload: response.data});
    } catch (error) {
        console.log(error);
    }
}

function* updateEntriesForPSDSS(action) {
    console.log('Sending data to server to update database')

    try{
        const response = yield call(axios.put, `/api/psdss`, action.payload)
        yield put({type: 'SET_INITIAL_DATA_FOR_PSDSS', payload: response.data});
    }
    catch(error){
        console.log('error trying to update db from psdssSaga')
    }
}


function* psdssSaga() {
  yield takeLatest('GET_INITIAL_DATA_FOR_PSDSS', getInitalValuesForPSDSS);
  yield takeLatest('UPSERT_DATA_FOR_PSDSS', updateEntriesForPSDSS);
}

export default psdssSaga;
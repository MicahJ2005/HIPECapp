import { put, takeLatest , call } from 'redux-saga/effects';
import axios from 'axios';


function* pciTotal(action) {
    try {
        const response = yield call(axios.get, `/pciTotal/${action.payload}`)
        yield put({ type: 'GET_PCI', payload: response.data })
        
        
      }
      catch (error) {
        console.log('error with getting reques', error);
        
      }
}

function* pciTotalSaga() {
    console.log('in PCI Total Saga');
    
  yield takeLatest('GET_PCI_TOTAL', pciTotal);
  
}

export default pciTotalSaga;
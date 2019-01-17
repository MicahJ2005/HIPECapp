import { takeLatest , call, put } from 'redux-saga/effects';
import axios from 'axios';


function* interventionResection(action) { 
    try {
        yield call(axios.put, `/interventionResection/${action.payload.userId}`, action.payload);
        yield put({ type: 'GET_PCI_TOTAL', payload: action.payload.userId } )

    } catch (error) {
        console.log(error);
        alert('Unable to add project, Please make sure all fields have been filled out!');
    }
}


function* interventionSaga() {
  yield takeLatest('POST_INTERVENTION_PAGE', interventionResection);
  
}

export default interventionSaga;
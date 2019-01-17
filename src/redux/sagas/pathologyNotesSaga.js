import { takeLatest , call, put } from 'redux-saga/effects';
import axios from 'axios';


function* pathologyNotes(action) {
    try {
        yield call(axios.post, `/pathologyNotes`, action.payload);
        yield put({ type: 'GET_PATHOLOGY_HISTORY', payload: action.payload.userId } )

    } catch (error) {
        console.log(error);
        alert('Unable to add project');
    }
}


function* pathologyNotesSaga() {
  yield takeLatest('UPDATE_PATHOLOGY_NOTE', pathologyNotes);
  
}

export default pathologyNotesSaga;
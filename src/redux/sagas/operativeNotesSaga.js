import { takeLatest , call, put } from 'redux-saga/effects';
import axios from 'axios';


function* operativeNotes(action) { 
    try {
        yield call(axios.post, `/operativeNotes`, action.payload);
        yield put({ type: 'GET_OPERATIVE_HISTORY', payload: action.payload.userId } )

    } catch (error) {
        console.log(error);
        alert('Unable to add project');
    }
}


function* operativeNotesSaga() {
  yield takeLatest('UPDATE_OPERATIVE_NOTE', operativeNotes);
  
}

export default operativeNotesSaga;
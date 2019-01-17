import axios from 'axios';
import { call, put, takeLatest, takeEvery, take, fork } from 'redux-saga/effects';

function* fetchPatient(action) {
    try {
      const response = yield call(axios.get, `/api/find-a-patient/${action.payload}`);
      yield put({ type: 'SET_PATIENT', payload: response.data });
      console.log(response.data);
    } catch (error) {
      console.log('Patient GET request failed', error);
    }
  }

function* newPatientId(action) {
    try {
        const response = yield call(axios.get, `/api/new-patient-id`);
        yield put({ type: 'SET_PATIENT', payload: response.data });
        console.log(response.data);
    } catch (error) {
        console.log('Patient GET request failed', error);
    }
}

// Saga triggered on ADD_PATIENT
function* addNewPatient(action) {
    try {
        console.log('IN ADD NEW PATIENT', action.payload);
        yield call(axios.post, '/api/add-a-patient', action.payload.patientObject);
        console.log('Payload from add-a-patient', action.payload);
        yield put({ type: 'SET_PATIENT', payload: action.payload.patientObject });
        // document.cookie = `patientID=${action.payload.patientObject.patient_no}`;
        // action.payload.history.push(`/MainTabsPage`);
    }
    catch (error) {
        console.log('there was an error with your POST', error);
    }
}

function* setPatientFromCookie(action) {
    try {
        console.log('CALL TO FIND-A-PATIENT', action.payload);
        const response = yield call(axios.get,`/api/find-a-patient/${action.payload}`);
        yield put({type: 'SET_PATIENT_RESULT', payload: response.data.patientSearch});

    }
    catch {
        console.log('error in our setPatientFromCookie SAGA');
    }
}

function* patientSaga() {
  yield takeEvery('FIND_PATIENT', fetchPatient);
  yield takeEvery('ADD_PATIENT', addNewPatient);
  yield takeEvery('LAST_PATIENT_ID_PLUS_ONE', newPatientId);
  yield takeLatest('GET_PATIENT_ID_FROM_COOKIE', setPatientFromCookie);
}

export default patientSaga;

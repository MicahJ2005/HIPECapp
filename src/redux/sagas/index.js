import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import patientSaga from './patientSaga';
import postOpSaga from './postOpSaga';
import adverseEventsSaga from './adverseEventsSaga';
import followUpSaga from './followUpSaga';
import followUpHistorySaga from './followUpHistorySaga';
import addNewUserSaga from './addNewUserSaga';
import allUsersSaga from './allUsersSaga';
import editIndividualUserSaga from './editIndividualProfileSaga';
import findUserProfileSaga from './getIndividualUserSaga';
import pathologyNotesSaga from './pathologyNotesSaga';
import operativeNotesSaga from './operativeNotesSaga';
import interventionSaga from './interventionResectionSaga';
import pathologyHistorySaga from './getPathologyHistorySaga';
import operativeHistorySaga from './getOperativeHistorySaga';
import pciTotalSaga from './pciSaga';
import primaryTumorSaga from './primaryTumorSaga';
import intakeSaga from './intakeSaga';
import psdssSaga from './psdssSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    patientSaga(),
    postOpSaga(),
    adverseEventsSaga(),
    followUpSaga(),
    followUpHistorySaga(),
    addNewUserSaga(),
    allUsersSaga(),
    editIndividualUserSaga(),
    findUserProfileSaga(),
    pathologyNotesSaga(),
    operativeNotesSaga(),
    interventionSaga(),
    pathologyHistorySaga(),
    operativeHistorySaga(),
    pciTotalSaga(),
    primaryTumorSaga(),
    intakeSaga(),
    psdssSaga(),
  ]);
}

import { put, takeLatest , call } from 'redux-saga/effects';
import axios from 'axios';


function* getInitalDataForIntake(action) { 
    console.log('Getting init values for intake page', action.payload);
    
    try {
        console.log(action.payload, 'this is our action.payload for our get init data on the intake saga')
        const response = yield axios.get( `/api/intake/${action.payload}`);
        yield put({ type: 'SET_INITAL_DATA_FOR_INTAKE', payload: response.data } )

    } catch (error) {
        console.log(error);
    }
}

function* sendUpdatedDataToDB(action) {
    console.log('SENDING DATA TO DB FOR THE INTAKE PAGE', action.payload)
    try {
        const response = yield call(axios.post, '/api/intake/', action.payload);
        yield put({type: 'SET_INITAL_DATA_FOR_INTAKE', payload: response.data})
        console.log(response.data);
    }
    catch(error){
        console.log(error)
    }
}



function* intakeSaga() {
  yield takeLatest('GET_INITIAL_DATA_FOR_INTAKE', getInitalDataForIntake);
  yield takeLatest('UPSERT_DATA_FOR_INTAKE', sendUpdatedDataToDB);
}

export default intakeSaga;
import { takeLatest , call, put } from 'redux-saga/effects';
import axios from 'axios';


function* editProfile(action) { 
    console.log('edit profile action.payload', action.payload);
    
    try {
        yield call(axios.put, `/editUserProfile/${action.payload.userId}`, action.payload);
        yield put({ type: 'RENDER_ALL_USERS', payload: action.payload.profileUserId } )

    } catch (error) {
        console.log(error);
        alert('Unable to add project');
    }
}


function* editProfileSaga() {
  yield takeLatest('EDIT_INDIVIDUAL_USER', editProfile);
  
}

export default editProfileSaga;
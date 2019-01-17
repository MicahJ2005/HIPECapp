import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker SAGA: will be fired on 'ADD_POST_OP' action
// user entered a new patient .. will add a blank row for patient
function* addPostOp(action) {
  try {
      // axios asynch call to add item on database
      yield call(axios.post, '/api/post_op', action.payload);
      // will need to make a call to update the list of item
      // yield put( { type: 'FETCH_ITEMS' } );
  }
  catch (error) {
      console.log('error with add post op post request');
  }
}

// worker Saga: will be fired on "FETCH_POST_OP" actions
function* fetchPostOp(action) {
  // action payload is id
  console.log('in fetch post op Saga', action.payload);
  // let patientId = action.payload;
  try {
    console.log('IN FETCH POST OP BEFORE GOING TO SERVER')
    const response = yield axios.get(`api/post_op/${action.payload}`);
    console.log('response from post op call :', response);
    // set state
    yield put({ type: 'SET_POST_OP', payload: response.data });
    // console.log('after SET POST OP:', response.data);
  } catch (error) {
    console.log('Post op get request failed', error);
  }
}

function* updatePostOp(action) {
  // action payload
  console.log('in update post op Saga', action.payload);
  try {
      yield call(axios.put, `/api/post_op`, action.payload);
      // let patientId = this.props.reduxState.patientReducer.patient.id;
      yield put( { type: 'FETCH_POST_OP' , payload: action.payload.patient_id} );
  } catch (error) {
      console.log(error);
      alert('Unable to update post op');
  }
}

// Will we ever need this? Will they remove patients?
// worker SAGA: will be fired on 'DELETE_ITEM' actions
// function* deleteItem(action) {
//   try {
//     //axios call to remove selected category
//     yield call(axios.delete, '/api/item', {params: {id: action.payload}});
//     // will need to make a call to update the list of catgories
//     yield put( { type: 'FETCH_ITEMS' } );
//   }
//   catch (error) {
//     console.log('error with delete request to /api/item');
//   } 
// }

function* postOpSaga() {
  yield takeLatest('ADD_POST_OP', addPostOp);
  yield takeLatest('FETCH_POST_OP', fetchPostOp);
  yield takeLatest('UPDATE_POST_OP', updatePostOp);
  // yield takeLatest('DELETE_ITEM', deleteItem);
}

export default postOpSaga;

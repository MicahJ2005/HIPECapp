import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker SAGA: will be fired on 'ADD_FOLLOW_UP_HISTORY' action
function* addFollowUpHistory(action) {
  try {
      // axios asynch call to add item on database
      yield call(axios.post, '/api/follow_up_history', action.payload);
      yield put( { type: 'FETCH_FOLLOW_UP_HISTORY' , payload: action.payload.patient_id} );
  }
  catch (error) {
      console.log('error with add follow up history post request');
  }
}

// worker Saga: will be fired on "FETCH_FOLLOW_UP_HISTORY" actions
function* fetchFollowUpHistory(action) {
  // console.log('in fetch follow up history Saga', action.payload);
  try {
    const response = yield axios.get(`api/follow_up_history/${action.payload}`);
    // console.log('response from follow up history:', response);
    // set state
    yield put({ type: 'SET_FOLLOW_UP_HISTORY', payload: response.data });
  } catch (error) {
    console.log('follow up history get request failed', error);
  }
}

function* updateFollowUpHistory(action) {
  console.log('in update follow up history Saga', action.payload);
  try {
      yield call(axios.put, `/api/follow_up_history`, action.payload);
      yield put( { type: 'FETCH_FOLLOW_UP_HISTORY' , payload: action.payload.patient_id} );
  } catch (error) {
      console.log(error);
      alert('Unable to update follow up history');
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

function* followUpHistorySaga() {
  yield takeLatest('ADD_FOLLOW_UP_HISTORY', addFollowUpHistory);
  yield takeLatest('FETCH_FOLLOW_UP_HISTORY', fetchFollowUpHistory);
  yield takeLatest('UPDATE_FOLLOW_UP_HISTORY', updateFollowUpHistory);
  // yield takeLatest('DELETE_ITEM', deleteItem);
}

export default followUpHistorySaga;

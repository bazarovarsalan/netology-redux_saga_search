import {
  takeLatest,
  debounce,
  retry,
  put,
  spawn,
  call,
} from "redux-saga/effects";
import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
  clearState,
} from "../actions/actionCreators";
import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
} from "../actions/actionTypes";
import { searchSkills } from "../api";

function filterChangeSearchAction({ type, payload }) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== "";
}

function filterClearSearchActoon({ type, payload }) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() === "";
}

function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search));
}

function* handleClearSearchSaga(action) {
  yield put(clearState(action.payload.search));
}

function* watchClearSearchSaga() {
  yield debounce(100, filterClearSearchActoon, handleClearSearchSaga);
}

function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload.search
    );

    yield put(searchSkillsSuccess(data));
  } catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

function* watchChangeSearchSaga() {
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
  yield spawn(watchClearSearchSaga);
}

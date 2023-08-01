import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_SUCCESS,
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
  CLEAR_STATE,
} from "./actionTypes";

export function searchSkillsRequest(search) {
  return { type: SEARCH_SKILLS_REQUEST, payload: { search } };
}

export function searchSkillsSuccess(items) {
  return { type: SEARCH_SKILLS_SUCCESS, payload: { items } };
}

export function searchSkillsFailure(error) {
  return { type: SEARCH_SKILLS_FAILURE, payload: { error } };
}

export function changeSearchField(search) {
  return { type: CHANGE_SEARCH_FIELD, payload: { search } };
}

export const clearState = (search) => ({
  type: CLEAR_STATE,
  payload: { search },
});

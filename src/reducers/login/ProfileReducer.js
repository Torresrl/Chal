import { NEW_PROFILE_IMAGE,
  UPLOAD_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE_FAILED,
  USER_INFO_FETCH_SUCCESS,
  NEW_NAME_CHANGE,
  USER_UPDATE,
  USER_UPLOAD_UPDATE_SUCCESS,
  INVALID_NAME,
  INVALID_NUMBER,
  WEAK_PASSWORD } from '../../Actions/types';


const INITIAL_STATE = {
  render_profile_pic: false,
  user: {},
  chosen_picture_uri: null,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_PROFILE_IMAGE:
      return { ...state, render_profile_pic: true, chosen_picture_uri: action.payload };
    case UPLOAD_PROFILE_PICTURE:
      return { ...state, render_profile_pic: false, profilePicture: action.payload };
    case UPLOAD_PROFILE_PICTURE_FAILED:
      return { ...state, error: 'Failed to upload profile picture' };
    case WEAK_PASSWORD:
      return { ...state, error: 'Password must be at least 7 chars', password: '' };
    case INVALID_NUMBER:
      return { ...state, error: 'Invalid Number' };
    case INVALID_NAME:
      return { ...state, error: 'Invalid Name' };
    case USER_INFO_FETCH_SUCCESS:
      return { ...state, user: action.payload };
    case NEW_NAME_CHANGE:
        return { ...state, name: action.payload };
    case USER_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
    case USER_UPLOAD_UPDATE_SUCCESS:
        return { ...state, name: action.payload[0], phoneNumber: action.payload[1], error: '' };
    default:
      return state;
  }
};

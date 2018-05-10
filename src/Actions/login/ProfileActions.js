import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { NEW_PROFILE_IMAGE,
          UPLOAD_PROFILE_PICTURE,
          UPLOAD_PROFILE_PICTURE_FAILED,
          USER_INFO_FETCH_SUCCESS,
          USER_UPDATE,
          USER_UPLOAD_UPDATE_SUCCESS,
          INVALID_NAME,
          INVALID_NUMBER,
          WEAK_PASSWORD,
          PASSWORD_UPDATE_FAIL,
          PASSWORD_UPDATE_SUCCESS,
          CHANGE_EMAIL,
          CHANGE_PASSWORD,
          EMAIL_MISSING,
          EMAIL_UPDATE_FAILED,
          EMAIL_UPDATE_SUCCESS,
          USER_CANCEL } from '../types';


export const addProfilePic = (text) => {
  return {
    type: NEW_PROFILE_IMAGE,
    payload: text
  };
};

export const userUpdate = ({ prop, value }) => {
  return {
    type: USER_UPDATE,
    payload: { prop, value }
  };
};

export const changeEmail = () => {
  return {
  type: CHANGE_EMAIL
  };
};

export const changePassword = () => {
  return {
  type: CHANGE_PASSWORD
  };
};

export const userCancel = () => {
  return {
    type: USER_CANCEL
  };
};

export const savePasswordChange = ({ password }) => {
  const { currentUser } = firebase.auth();

  if (password == null || password.length < 7) {
    return {
      type: WEAK_PASSWORD
    };
  }

  return (dispatch) => {
    currentUser.updatePassword(password)
    .catch(() => {
      console.log('Password set unsuccessfully');
      passwordSetFail(dispatch);
    })
    .then(() => {
      console.log('Password set successfully');
      passwordSetSuccessfully(dispatch);
    });
  };
};

export const saveEmailChange = ({ email }) => {
  const { currentUser } = firebase.auth();

  if (email.length === null || email.length === 0) {
      return {
          type: EMAIL_MISSING
      };
    }

    return (dispatch) => {
      currentUser.updateEmail(email)
      .catch(() => {
        console.log('Email failed');
        setEmailFailed(dispatch);
      })
      .then(() => {
        console.log('Email set successfully');
        emailSetSuccessfully(dispatch);
      });
    };
};

export const emailSetSuccessfully = (dispatch) => {
  dispatch({
    type: EMAIL_UPDATE_SUCCESS
  });
  Actions.profile();
};

export const setEmailFailed = (dispatch) => {
  dispatch({
    type: EMAIL_UPDATE_FAILED
  });
};


export const passwordSetSuccessfully = (dispatch) => {
  dispatch({
    type: PASSWORD_UPDATE_SUCCESS
  });
  Actions.profile();
};

export const passwordSetFail = (dispatch) => {
  console.log('fail');
  dispatch({
    type: PASSWORD_UPDATE_FAIL
  });
};


export const saveUserUpdate = ({ displayName, phoneNumber }) => {
  const { currentUser } = firebase.auth();

  if (displayName == null || displayName.length < 2) {
    return {
      type: INVALID_NAME
    };
  }

  return (dispatch) => {
    currentUser.updateProfile({
      displayName,
      phoneNumber
    })
    .then(() => {
      dispatch({
        type: USER_UPLOAD_UPDATE_SUCCESS,
        payload: [displayName, phoneNumber]
      });
    })
    .then(Actions.profile({ type: 'reset' }));
  };
};

export const uploadProfilePicture = (uri) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    currentUser.updateProfile({
      photoURL: uri
    })
    .catch(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE_FAILED });
    })
    .then(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE, payload: uri });
    })
    .then(console.log('Upload profile picture successfully'))
    .then(Actions.main({ type: 'reset' }));
  };
};

export const uploadUpdateProfilePicture = (uri) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    currentUser.updateProfile({
      photoURL: uri
    })
    .catch(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE_FAILED });
    })
    .then(() => {
      dispatch({ type: UPLOAD_PROFILE_PICTURE, payload: uri });
    })
    .then(console.log('Upload profile picture successfully'))
    .then(() => {
      dispatch({ type: USER_INFO_FETCH_SUCCESS, payload: currentUser });
    })
    .then(Actions.main({ type: 'reset' }));
  };
};

export const userInfoFetch = () => {
    const { currentUser } = firebase.auth();

    return {
      type: USER_INFO_FETCH_SUCCESS,
      payload: currentUser
  };
};

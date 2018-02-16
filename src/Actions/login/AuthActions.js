import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {EMAIL_CHANGE,
    PASSWORD_CHANGE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    TRY_LOGIN,
    RE_AUTHENTICATION_SUCCESS,
    RE_AUTHENTICATION_FAIL
} from '../types';


export const emailChange = (text) => {
    return {
        type: EMAIL_CHANGE,
        payload: text
    };
};

export const passwordChange = (text) => {
    return {
        type: PASSWORD_CHANGE,
        payload: text
    };
};

export const reAuthenticate = ({ email, password, changedEmail }) => {
  const { currentUser } = firebase.auth();
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );
  return (dispatch) => {
    dispatch({
      type: TRY_LOGIN
    });

    currentUser.reauthenticateWithCredential(credential)
    .then(user => {
      console.log('Re-authentication success');
      re_authenticationSuccess(dispatch, user, changedEmail);
    })
    .catch(() => {
      console.log('Re-authentication unsuccessful');
      re_authenticationFail(dispatch);
    });
  };
};

export const re_authenticationSuccess = (dispatch, user, changedEmail) => {
  dispatch({
    type: RE_AUTHENTICATION_SUCCESS, payload: user
  });
  if (changedEmail) {
    Actions.newEmailForm();
  } else {
    Actions.newPasswordForm();
  }
};

export const re_authenticationFail = (dispatch) => {
  dispatch({
    type: RE_AUTHENTICATION_FAIL
  });
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {

        dispatch ({
            type: TRY_LOGIN
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginSuccess(dispatch, user))
            .catch(() => loginFail(dispatch))
    };
};

const loginSuccess = (dispatch, user) => {
    dispatch ({
        type: LOGIN_SUCCESS
    });
    Actions.main({type: 'reset'});

};

const loginFail = (dispatch) => {
    dispatch ({
        type: LOGIN_FAIL
        });

};

import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {NEW_EMAIL_CHANGE,
    NEW_PASSWORD_CHANGE,
    NEW_NAME_CHANGE,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    EMAIL_MISSING,
    WEAK_PASSWORD,
    NAME_MISSING
} from '../types';

export const newEmailChange = (text) => {
    return {
        type: NEW_EMAIL_CHANGE,
        payload: text
    };
};


export const newPasswordChange = (text) => {
    return {
        type: NEW_PASSWORD_CHANGE,
        payload: text
    };
};

export const newNameChange = (text) => {
    return {
        type: NEW_NAME_CHANGE,
        payload: text
    }
};

export const createUser = ({email, password, name}) => {

    if(email.length == null || email.length === 0){
        return {
            type: EMAIL_MISSING
        };
    }else if(password.length < 7){
        return {
            type: WEAK_PASSWORD
        };
    } else if(name.length == null || name.length === 0){
        return {
            type: NAME_MISSING
        };
    }


    return (dispatch) => {
        dispatch({type: CREATE_USER});

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => user.updateProfile({displayName: name}))
            .then(user => createUserSuccess(dispatch, user))
            .catch(() => createUserFail(dispatch));
    };
};

const createUserSuccess = (dispatch, user) => {
    dispatch({
        type: CREATE_USER_SUCCESS,
        payload: user
    });

    Actions.push('newProfilePicture', { type: 'reset' });
};


const createUserFail = (dispatch) => {
    dispatch({
        type: CREATE_USER_FAIL
    });
};

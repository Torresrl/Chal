import {EMAIL_CHANGE,
    PASSWORD_CHANGE,
    CREATE_USER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    TRY_LOGIN,
    RE_AUTHENTICATION_SUCCESS,
    RE_AUTHENTICATION_FAIL,
    WEAK_PASSWORD,
    EMAIL_UPDATE_FAILED,
    EMAIL_UPDATE_SUCCESS,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAIL,
    EMAIL_MISSING,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    USER_CANCEL
} from '../../Actions/types';

const INITIAL_STATE = {
    email: "torres.lande@gmail.com",
    password: "1234567",
    user: null,
    load: false,
    error: ''
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RE_AUTHENTICATION_FAIL:
          return { ...state, error: 'Something went wrong', load: false };
        case WEAK_PASSWORD:
          return { ...state, error: 'Password must be at least 7 chars', password: '' };
        case RE_AUTHENTICATION_SUCCESS:
            return { ...state, user: action.payload, load: false, password: '' };
        case EMAIL_MISSING:
          return { ...state, error: 'Invalid email' };
        case EMAIL_CHANGE:
            return { ...state, email: action.payload };
        case EMAIL_UPDATE_FAILED:
            return { ...state, error: 'Failed to set email' };
        case PASSWORD_UPDATE_SUCCESS:
          return { ...state, error: '' };
        case EMAIL_UPDATE_SUCCESS:
            return { ...state, error: '' };
        case PASSWORD_UPDATE_FAIL:
            return { ...state, error: 'Failed to set password', password: '' };
        case PASSWORD_CHANGE:
            return { ...state, password: action.payload, error: '' };
        case CREATE_USER_SUCCESS:
            return{...state, ...INITIAL_STATE, user: action.payload};
        case CHANGE_EMAIL:
          return { ...state, changedEmail: true, error: '' };
        case CHANGE_PASSWORD:
            return { ...state, changedEmail: false, error: '' };
        case LOGIN_SUCCESS:
            return {...state, load: false, user: action.payload, password: '' };
        case LOGIN_FAIL:
            return{...state, load: false, password: "",
                error:"email or password is wrong"};
        case USER_CANCEL:
            return { ...state, INITIAL_STATE };
        case TRY_LOGIN:
            return {...state, load: true};
        default:
            return state;
    }
}

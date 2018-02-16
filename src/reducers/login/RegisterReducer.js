import {
    NEW_EMAIL_CHANGE,
    NEW_PASSWORD_CHANGE,
    NEW_NAME_CHANGE,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    EMAIL_MISSING,
    WEAK_PASSWORD,
    NAME_MISSING

} from '../../Actions/types';

const INITIAL_STATE = {
    email: "",
    password: "",
    name: "",
    load: false,
    error: "",
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case NEW_EMAIL_CHANGE:
            return {...state, email: action.payload};
        case NEW_PASSWORD_CHANGE:
            return {...state, password: action.payload};
        case NEW_NAME_CHANGE:
            return {...state, name: action.payload};
        case CREATE_USER:
            return {...state, load: true};
        case CREATE_USER_SUCCESS:
            return INITIAL_STATE;
        case CREATE_USER_FAIL:
            return {...state, load: false, password: "", error: "couldn't create user"};
        case EMAIL_MISSING:
            return {...state, error: "You need to fill in a Email"};
        case WEAK_PASSWORD:
            return {...state, password: "",
                error: "Your password need to be 7 characters or more."};
        case NAME_MISSING:
            return {...state, error: "You need to fill in a Name"};

        default:
            return state;
    }
}
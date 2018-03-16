import {
    CODE_CHANGE,
    JOIN_CHALLENGE_SUCCESS,
    JOIN_CHALLENGE_FAIL
} from '../../Actions/types';

const INITIAL_STATE = {
    code: "-",
    error: ""
};

export default(state = INITIAL_STATE, action) => {
    switch (action.type){
        case CODE_CHANGE:
            return {...state, code: "" + action.payload};
        case JOIN_CHALLENGE_SUCCESS:
            return {...state, code: ""};
        case JOIN_CHALLENGE_FAIL:
            return {...state, error: "couldn't find challenge"};
        default:
            return state;
    }
}
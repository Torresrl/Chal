import {
    CHALLENGES_FETCH_SUCCESS,
    CHALLENGES_FETCH} from '../../Actions/types';

const INITIAL_STATE = {
    load: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CHALLENGES_FETCH:
            return {...state, load: true};
        case CHALLENGES_FETCH_SUCCESS:
            return {...state, load: false};
        default:
            return state;
    }
};
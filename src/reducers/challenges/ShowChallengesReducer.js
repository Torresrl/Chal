import {CHALLENGES_FETCH_IMAGE_SUCCESS,
    CHALLENGES_FETCH_IMAGE,

} from '../../Actions/types';

const INITIAL_STATE = {
    url: "",
    load: true,

};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CHALLENGES_FETCH_IMAGE_SUCCESS:
            return {...state, url: action.payload, load: false};
        case CHALLENGES_FETCH_IMAGE:
            return{...state, load: true};


        default:
            return state;
    }
}
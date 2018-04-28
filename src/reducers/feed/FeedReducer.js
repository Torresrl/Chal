import {FEED_FETCH_SUCCESS} from '../../Actions/types';

const INITIAL_STATE = {
    feed: {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FEED_FETCH_SUCCESS:
            return {...state, feed: action.payload};
        default:
            return state;
    }
}
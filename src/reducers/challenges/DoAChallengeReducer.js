import {COMMENT_CHANGE,
    DO_CHALLENG_ADD_IMAGE,
    DO_CHALLENGE_TIMELINE_FETCH,
    NO_IMAGE_ADDED,
    DO_A_CHALLENGE_NAV_BAR,
    DO_CHALLENGE_TIMELINE_TOP_FETCH
} from '../../Actions/types';

const INITIAL_STATE = {
    image: null,
    comment: "",
    timeline: {}, //denne er standard timelinen (All)
    timelineTop: {},
    error: "",
    navBar: ""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case COMMENT_CHANGE:
            return {...state, comment: action.payload};
        case DO_CHALLENG_ADD_IMAGE:
            return{...state, image: action.payload, error: ""};
        case DO_CHALLENGE_TIMELINE_FETCH:
            return {...state, timeline: action.payload};
        case NO_IMAGE_ADDED:
            return {...state, error: "You need to add a image"};
        case DO_A_CHALLENGE_NAV_BAR:
            return {...state, navBar: action.payload};
        case DO_CHALLENGE_TIMELINE_TOP_FETCH:
            return {...state, timelineTop: action.payload};
        default:
            return state;
    }
}
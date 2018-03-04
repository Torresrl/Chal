
import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE,
        CHALLENGES_NAME_NOT_VALID,
        CHALLENGES_DESCRIPTION_NOT_VALID,
        TRY_ADD_CHALLENGES,
        ADD_CHALLENGE,
        CHALLENG_NAME,
        CHALLENG_DES,
        NOT_VALID_NAME,
        NOT_VALID_DESCRIPTION,
        CHALLENGES_CREATED,
        MAKE_MODAL_NOT_VISIBLE,
        CHALLENGE_COUNTER
} from '../../Actions/types';

const INITIAL_STATE = {
    nameChallenges: "",
    description: "",
    image: null,
    challengesError: "",
    challengeName: "",
    challengeDes: "",
    challenges: [],
    challengeNr: 0,
    error: "",
    load: false,
    challengesCode: "",
    modalVisible: false,
    mainImage: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CHALLENGES_NAME:
            return{...state, nameChallenges: action.payload};
        case CHALLENGES_DESCRIPTION:
            return {...state, description: action.payload};
        case CHALLENGES_IMAGE:
            return {...state, image: action.payload, mainImage: true};
        case CHALLENGES_NAME_NOT_VALID:
            return {...state, challengesError: "you need to add a name"};
        case CHALLENGES_DESCRIPTION_NOT_VALID:
            return {...state, challengesError: "you need to add description"};
        case CHALLENG_NAME:
            return{...state, challengeName: action.payload};
        case CHALLENG_DES:
            return {...state, challengeDes: action.payload};
        case CHALLENGE_COUNTER:
            return {...state, challengeNr: action.payload};
        case NOT_VALID_NAME:
            return {...state, error: "Every challenge need a name"};
        case NOT_VALID_DESCRIPTION:
            return {...state, error: "Every challenge need a description"};
        case TRY_ADD_CHALLENGES:
            return {
                ...state,
                load: true,
                challengesCode: action.payload,
                modalVisible: true
            };
        case ADD_CHALLENGE:
            return{...state,
                challenges: [...state.challenges, action.payload],
                challengeName:"",
                challengeDes:"",
                error: ""
            };
        case CHALLENGES_CREATED:
            return INITIAL_STATE;
        case MAKE_MODAL_NOT_VISIBLE:
            return {...state, modalVisible: false};
        default:
            return state;
    }
}
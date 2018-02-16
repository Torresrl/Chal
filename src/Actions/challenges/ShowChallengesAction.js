import firebase from 'firebase';
import {
    CHALLENGES_FETCH_IMAGE_SUCCESS,
    CHALLENGES_FETCH_IMAGE,
    SHOW_CHALLEGES_NAV_BAR
} from '../types';



export const getImage = (challengesId) => {
    const {currentUser} = firebase.auth();

    const storage = firebase.storage()
        .ref(`/challenges/${challengesId}/mainImage`);

    return (dispatch) => {
        dispatch({
            type: CHALLENGES_FETCH_IMAGE
        });

        storage.getDownloadURL().then((url) => {
            dispatch({
                type: CHALLENGES_FETCH_IMAGE_SUCCESS,
                payload: url
            })

        });
    }
};

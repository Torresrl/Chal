import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
//import RNFetchBlob from 'react-native-fetch-blob';
import {Platform} from 'react-native';
import {uploadPhotoToServer} from '../mediaAction/photo';

import {CHALLENGES_NAME,
        CHALLENGES_DESCRIPTION,
        CHALLENGES_IMAGE,
        CHALLENGES_NAME_NOT_VALID,
        CHALLENGES_DESCRIPTION_NOT_VALID,
        TRY_ADD_CHALLENGES,
        ADD_CHALLENGE,
        CHALLENG_NAME,
        CHALLENG_DES,
        CHALLENGE_COUNTER,
        NOT_VALID_NAME,
        NOT_VALID_DESCRIPTION,
        CHALLENGES_CREATED,
        MAKE_MODAL_NOT_VISIBLE
} from '../types';


export const nameChange = (text) => {
    return {
        type: CHALLENGES_NAME,
        payload: text
    };
};

export const descriptionChange = (text) => {
    return {
        type: CHALLENGES_DESCRIPTION,
        payload: text
    };
};

export const addImage = (text) => {
    return {
        type: CHALLENGES_IMAGE,
        payload: text

    };
};

export const challengeNameChange = (text) => {
    return {
        type: CHALLENG_NAME,
        payload: text
    };
};

export const challengeDesChange = (text) => {
    return {
        type: CHALLENG_DES,
        payload: text
    };
};

export const challengeCounter = (nr) => {
    let counter = nr + 1;
    return {
        type: CHALLENGE_COUNTER,
        payload: counter
    };
};

export const makeModalNotVisible = () => {
    return{
        type: MAKE_MODAL_NOT_VISIBLE
    };
};

export const addChallenge = (text) => {

    if(text.name.length == null || text.name.length === 0) {
        return {
            type: NOT_VALID_NAME
        }
    } else if (text.description.length == null || text.description.length === 0){
        return {
            type: NOT_VALID_DESCRIPTION
        }
    } else {
        return {
            type: ADD_CHALLENGE,
            payload: text
        }
    }

};

export const addChallenges = ({name, description, image, challenges, mainImage}) => {

    const {currentUser} = firebase.auth();
    const challengesId = firebase.database().ref('posts').push().key;


    if(name.length == null || name.length === 0){
        return {
            type: CHALLENGES_NAME_NOT_VALID
        }
    } else if(description.length == null || description.length === 0){
        return {
            type: CHALLENGES_DESCRIPTION_NOT_VALID
        }
    }

    if(mainImage)  {
        return (dispatch) => {

            dispatch({
                type: TRY_ADD_CHALLENGES,
                payload: challengesId
            });



            firebase.database()
                .ref(`/challenges/${challengesId}`)
                .set({name, description, owner: currentUser.uid, challengesId, challenges, mainImage})
                .then(() => {
                    firebase.database()
                        .ref(`/Users/${currentUser.uid}/myChallenges/${challengesId}`)
                        .set({
                            name,
                            description,
                            owner: currentUser.uid,
                            challengesId,
                            challenges,
                            timeline: null,
                            mainImage
                        })
                })
                .then(() => {
                    const location = `*challenges*${challengesId}*mainImage`;
                    uploadPhotoToServer(location, image);
                }).then(() => {
                    Actions.main({type: 'reset'});
                }).then(() => {
                    dispatch({
                    type: CHALLENGES_CREATED
                });

            });
        };
    } else {
        return (dispatch) => {
            dispatch({
                type: TRY_ADD_CHALLENGES,
                payload: challengesId
            });
            firebase.database()
                .ref(`/challenges/${challengesId}`)
                .set({name, description, owner: currentUser.uid, challengesId, challenges, mainImage})
                .then(() => {

                    firebase.database()
                        .ref(`/Users/${currentUser.uid}/myChallenges/${challengesId}`)
                        .set({
                            name,
                            description,
                            owner: currentUser.uid,
                            challengesId,
                            challenges,
                            timeline: null,
                            mainImage
                        })
                })
                .then(() => {
                dispatch({
                    type: CHALLENGES_CREATED
                });

                Actions.main({type: 'reset'});

            });
        };

    }


};






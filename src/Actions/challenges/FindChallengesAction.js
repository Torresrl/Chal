import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
    CODE_CHANGE,
    JOIN_CHALLENGE_SUCCESS,
    JOIN_CHALLENGE_FAIL
} from '../types';

export const codeChange = (text) => {
    return {
        type: CODE_CHANGE,
        payload: text
    };
};


export const joinChallenges = (code) => {
    const {currentUser} = firebase.auth();
    const database = firebase.database();

    //sjekker om stringern er ""
    if(code.length == null || code.length === 0) {
        return {type: JOIN_CHALLENGE_FAIL};
    }

    //kopierer en challenges fra Challenges til Useres/userId/myChallenges
    return (dispatch) => {

        database.ref(`challenges/${code}`).once('value', function(snap) {

            if(snap.hasChild("challengesId")) {

                database.ref(`challenges/${code}/followers/${currentUser.uid}`)
                    .set(true);

                database.ref(`Users/${currentUser.uid}/myChallenges/${code}`)
                    .set(snap.val())
                    .then(() => joinChallengeSuccess(dispatch))
                    .catch(() => joinChallengeFail(dispatch))
            } else {
                dispatch ({
                    type: JOIN_CHALLENGE_FAIL
                });
            }
        });
    }



};

const joinChallengeSuccess = (dispatch) => {
    dispatch({
        type: JOIN_CHALLENGE_SUCCESS
    });
    Actions.main({type: 'reset'});
};

const joinChallengeFail = (dispatch) => {
    dispatch ({
        type: JOIN_CHALLENGE_FAIL
    });
};
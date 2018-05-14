import firebase from 'firebase';
//import RNFetchBlob from 'react-native-fetch-blob';
import {uploadPhotoToServer} from '../mediaAction/photo';
import {COMMENT_CHANGE,
    DO_CHALLENG_ADD_IMAGE,
    DO_CHALLENGE_TIMELINE_FETCH,
    NO_IMAGE_ADDED,
    DO_A_CHALLENGE_NAV_BAR,
    DO_CHALLENGE_TIMELINE_TOP_FETCH
} from '../types';


export const commentChange = (text) => {
    return {
        type: COMMENT_CHANGE,
        payload: text
    };
};

export const addImageChallenge = (image) => {
    return {
        type: DO_CHALLENG_ADD_IMAGE,
        payload: image
    };
};

//Vilken liste som er valgt (all, frinds, top)
export const doAChallengeNavBar= (buttonValue) => {
    return{
        type: DO_A_CHALLENGE_NAV_BAR,
        payload: buttonValue
    };
};


//hente ut kommenteren du hadde til en challenge
export const getCurrentUserComment = (challengesId, challengeId) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        firebase.database()
            .ref('/Users/' +
                currentUser.uid + '/myChallenges/' +
                challengesId +'/challenges/' +
                challengeId + '/timeline/' +
                currentUser.uid)
            .on('value', snap => {
                dispatch({
                    type: COMMENT_CHANGE,
                    payload: snap.val().comment
                })
            });
    }
};

//brukes til å oppdatere flere poster samtidig
export const challengDone = (object) => {
    const {currentUser} = firebase.auth();
    const {image, comment, challengeId, challengesId, owner, followers} = object;
    const database = firebase.database();


    if (image != null) {
        // prøv denne metoden: https://gist.github.com/davideast/e68aa87ea6f0e7a4dc08

        let post = {
            userName: currentUser.displayName,
            userId: currentUser.uid,
            comment: comment,
            voted: false,
            votes: 0,
            //firebse server gir tiden posten blir lagt til databasen
            postedAt: firebase.database.ServerValue.TIMESTAMP,
            image: '/challenges/'
            + challengesId + '/'
            + challengeId +
            '/timeline/'
            + currentUser.uid,
            challengeId: challengeId,
            challengesId: challengesId
        };

        let fanoutObj = fanoutPost({
            challengeId: challengeId,
            challengesId: challengesId,
            followers: followers,
            post: post,
            owner: owner
        });

        return () => {
            const location = `*challenges*${challengesId}*${challengeId}*timeline*${currentUser.uid}`;
            uploadPhotoToServer(location, image);
            //uploadImage(image, challengesId, challengeId);
            database.ref().update(fanoutObj);

        }
    } else {
        return {
            type: NO_IMAGE_ADDED
        };
    }
};

//henter ut en liste men informasjon om hver challenge sortert etter tid
export const fetchTimeline = (challengesId, challengeId) => {
    const {currentUser} = firebase.auth();
    let sortedList = {};

    return (dispatch) => {
        firebase.database()
            .ref('/Users/' +
                currentUser.uid + '/myChallenges/' +
                challengesId +'/challenges/' +
                challengeId + '/timeline')
            .orderByChild('postedAt')

            //se link for sortering
            //https://stackoverflow.com/questions/33893866/orderbychild-not-working-in-firebase

            .on('value', snapshot => {
                snapshot.forEach( function(child){
                    sortedList[child.key] = child.val();

                });

                dispatch({
                    type: DO_CHALLENGE_TIMELINE_FETCH,
                    payload: sortedList
                });
            });
    }

};

//henter ut liste med info om hver challenge sortert etter poengsum
export const fetchTimelineTop = (challengesId, challengeId) => {
    const {currentUser} = firebase.auth();
    let sortedList = {};

    return (dispatch) => {
        firebase.database()
            .ref('/Users/' +
                currentUser.uid + '/myChallenges/' +
                challengesId +'/challenges/' +
                challengeId + '/timeline')
            .orderByChild('votes')
            .on('value', snapshot => {
                snapshot.forEach( function(child){
                    sortedList[child.key] = child.val();
                });
                //se link for sortering
                //https://stackoverflow.com/questions/33893866/orderbychild-not-working-in-firebase
                dispatch({
                    type: DO_CHALLENGE_TIMELINE_TOP_FETCH,
                    payload: sortedList
                });
            });
    }

};


const fanoutPost =({challengeId, challengesId, followers, post, owner}) => {
    const {currentUser} = firebase.auth();

    let fanoutObj = {};

    //update challenges
    fanoutObj[
        'challenges/' + challengesId +
        '/challenges/' + challengeId +
        '/timeline/' + currentUser.uid] = post;

    return fanoutObj;
};

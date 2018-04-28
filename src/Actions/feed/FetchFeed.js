import firebase from 'firebase';
import {FEED_FETCH_SUCCESS} from '../types'

//get all the newest challenge from data base
export const fetchFeed = () => {
    const {currentUser} = firebase.auth();
    let sortedList = {};

    return (dispatch) => {
        firebase.database().ref('/Users/' +
            currentUser.uid + '/timeline/')
            .on('value', snapshot => {
                snapshot.forEach( function(child) {
                    sortedList[child.key] = child.val();
                });
                dispatch({
                    type: FEED_FETCH_SUCCESS,
                    payload: sortedList
                })
            })
    }
};
import Expo from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyAjlvAZ8yEUUJx49W06WNfa0Skt3pzTav4',
            authDomain: 'challenges-840a4.firebaseapp.com',
            databaseURL: 'https://challenges-840a4.firebaseio.com',
            projectId: 'challenges-840a4',
            storageBucket: 'challenges-840a4.appspot.com',
            messagingSenderId: '637891220380'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>

        );
    }
}


export default App;

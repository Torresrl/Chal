import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Text } from 'react-native';
import LoginForm from './components/Login/LoginForm';
import NewUser from './components/Login/NewUser';
import Feed from './components/Feed';
import Profile from './components/Profile/Profile';
import ProfileEdit from './components/Profile/ProfileEdit';
import Challenges from './components/challenges/challenges_list/Challenges';
import NewChallenges from './components/challenges/create_new/NewChallenges';
import FindChallenges from './components/challenges/FindChallenges';
import ShowChallenges from './components/challenges/show_challenges/ShowChallenges';
import DoAChallenge from './components/challenges/show_challenges/DoAChallenge/DoAChallenge';
import AddProfilePicture from './components/Login/AddProfilePicture';
import DisplayProfilePicture from './components/Profile/DisplayProfilePicture';
import ReauthenticateUser from './components/Profile/ReauthenticateUser';
import NewPasswordForm from './components/Profile/NewPasswordForm';
import NewEmailForm from './components/Profile/NewEmailForm';
import {Icon} from 'react-native-elements';

const RouterComponent = () => {

    const TabIcon = ({ selected, title }) => {
        switch (title) {
            // Currectly hating this repetition... oh.. react-native
            case 'Home': return <Icon name="home" />;
            case 'Profile': return <Icon name="person" />;


        }

        return (
            <Text style={{color:'black', fontWeight: 'bold'}}>{title}</Text>
        );
    };

    return (

        <Router>
            <Scene key="root" hideNavBar>
                {/* Scenene for Login*/}
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Challenges" />
                    <Scene key="newUser" component={NewUser} title="Create User"/>
                    <Scene key="newProfilePicture" component={AddProfilePicture} title="Add Profile Picture"/>
                </Scene>

                {/* Scenene for for allt innhold etter innloging*/}
                <Scene key="main" tabs tabBarStyle={styles.tabBarStyle}>
                    <Scene key="tabFeed" title="Home" icon={TabIcon} selected="home">
                        <Scene key="feed"
                               component={Feed}
                               title="Home"
                                />
                    </Scene>
                    <Scene key="tabChallenges"
                           title="C"
                           icon={TabIcon}
                    >
                        <Scene
                            key="challenges"
                            component={Challenges}
                            title="Challenges"
                            renderRightButton={Challenges.renderRightButton}
                            renderLeftButton={Challenges.renderLeftButton}
                        />
                        <Scene
                            key="newChallenges"
                            component={NewChallenges}
                            title="New Challenges"
                        />
                        <Scene
                            key="findChallenges"
                            component={FindChallenges}
                            title="Join a Challenge"
                        />
                        <Scene
                            key="showChallenges"
                            component={ShowChallenges}
                            title="Challenges"
                        />
                        <Scene
                            key="doAChallenge"
                            component={DoAChallenge}
                            title="Challenge"
                        />
                    </Scene>
                    <Scene key="tabProfile" title="Profile" icon={TabIcon}>
                        <Scene
                            key="profile"
                            component={Profile}
                            title="Profile"
                            onRight={() => Actions.profileEditForm()}
                            rightTitle="Edit"
                        />
                            <Scene
                            onRight={() => Actions.displayNewProfilePicture()}
                            rightTitle="New Photo"
                            key="profileEditForm"
                            component={ProfileEdit}
                            title="Edit Profile"
                            />


                            <Scene
                            key="reauthenticateUser"
                            component={ReauthenticateUser}
                            title="Re-authentication"
                            />

                            <Scene
                            key="newPasswordForm"
                            component={NewPasswordForm}
                            title={'New Password'}
                            type="reset"
                            />
                            <Scene
                            key="newEmailForm"
                            component={NewEmailForm}
                            title={'New Email'}
                            type="reset"
                            />

                            <Scene
                            key="displayNewProfilePicture"
                            component={DisplayProfilePicture}
                            title="Photo"
                            />

                    </Scene>
                </Scene>
            </Scene>
        </Router>

    );
};



const getIcon = name => {
    switch (name) {
        // Currectly hating this repetition... oh.. react-native
        case 'home': return <Icon name="home" type="SimpleLineIcons" />;

    }
    return null
}

let styles = {
    tabBarStyle: {
        backgroundColor: '#EDECF0',
        borderColor: '#B0B0B4',
        borderTopWidth: 1
    }
};

export default RouterComponent;

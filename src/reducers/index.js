import { combineReducers } from 'redux';
import AuthReducer from './login/AuthReducer';
import RegisterReducer from './login/RegisterReducer';
import NewChallengesReducer from './challenges/NewChallengesReducer';
import ChallengesListReducer from './challenges/ChallengesListReducer';
import ChallengesReducer from './challenges/ChallengesReducer';
import ShowChallengesReducer from './challenges/ShowChallengesReducer';
import FindChallengesReducer from './challenges/FindChallengesReducer';
import DoAChallengeReducer from './challenges/DoAChallengeReducer';
import ProfileReducer from './login/ProfileReducer';

export default combineReducers({
    auth: AuthReducer,
    register: RegisterReducer,
    newChallenges: NewChallengesReducer,
    challengesList: ChallengesListReducer,
    challenges: ChallengesReducer,
    showChallenges: ShowChallengesReducer,
    findChallenges: FindChallengesReducer,
    doAChallenge: DoAChallengeReducer,
    profile: ProfileReducer
});

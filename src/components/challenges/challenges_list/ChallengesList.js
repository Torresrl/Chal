import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {challengesFetch} from '../../../Actions';
import ChallengesListItem from './ChallengesListItem';

class ChallengesList extends Component{

    componentWillMount() {
        this.props.challengesFetch();

    }


    renderItem({item}) {
        return (
            <ChallengesListItem
                id={item.challengesId}
                challenges={item}/>
        )
    }


    render() {

        const {challengesList} = this.props;

        return(
            <FlatList
                data={challengesList}
                renderItem={this.renderItem}
                keyExtractor={item => item.challengesId}

            />

        );
    }

}

const mapStateToProps = state => {
    const challengesList = _.map(state.challengesList, (val, uid) => {
        return {...val, uid};
    });
    return {challengesList};
};

export default connect(mapStateToProps, {challengesFetch})(ChallengesList);
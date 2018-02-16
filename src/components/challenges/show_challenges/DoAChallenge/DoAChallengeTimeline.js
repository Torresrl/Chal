import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchTimeline} from '../../../../Actions';
import {FlatList} from 'react-native';
import TimelineItem from '../TimelineItem';


class DoAChallengeTimeline extends Component {

    componentWillMount(){
        const {challengesId, challengeId} = this.props;
        this.props.fetchTimeline(challengesId, challengeId);
    }

    renderItem(item){
        const {challengesId, challengeId, owner} = this.props;
        return (
            <TimelineItem
                post={item}
                challengesId={challengesId}
                challengeId={challengeId}
                owner={owner}
            />
        );
    }



    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={item => item.userId}
            />

        );
    }

}

const styles = {
    containerStyle: {
        marginBottom: 65
    }
};


//når du debugger feilen er her, du har fikset den før.....
const mapStateToProps = ({doAChallenge}) => {
    const {timeline} = doAChallenge;


    const timelineList = _.map(timeline, (val, uid) => {
        return {...val, uid};
    });
    const data = _.sortBy(timelineList, ['postedAt'], ['asc']);


    return {data};
};

export default connect(mapStateToProps, {fetchTimeline}) (DoAChallengeTimeline);
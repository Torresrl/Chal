import React, {Component} from 'react';
import {connect} from 'react-redux'
import _ from 'lodash'
import {fetchFeed} from '../Actions'
import {View, Text} from 'react-native';
import {FlatList} from 'react-native';
import TimelineItem from '../components/challenges/show_challenges/TimelineItem'


class Feed extends Component {

    componentWillMount() {
        this.props.fetchFeed();
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
        return(
            <FlatList
                data={this.props.data}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={(item, index) => index}
            />
        );
    }
}

const mapStateToProps = ({feedReducer}) => {
    const {feed} = feedReducer;
    const data = _.map(feed, (val, uid) => {
        return {...val, uid}
    });

    return {data};
};

export default connect(mapStateToProps, {fetchFeed})(Feed);
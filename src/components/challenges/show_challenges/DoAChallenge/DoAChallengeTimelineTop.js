import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {fetchTimelineTop} from '../../../../Actions';
import {ListView} from 'react-native';
import TimelineItem from '../TimelineItem';


class DoAChallengeTimelineTop extends Component {

    componentWillMount(){
        const {challengesId, challengeId} = this.props;
        this.props.fetchTimelineTop(challengesId, challengeId);
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
    }

    createDataSource({data}){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(data)
    }

    renderRow(timelineItem){
        const {challengesId, challengeId, owner} = this.props;

        return <TimelineItem
            post={timelineItem}
            challengesId={challengesId}
            challengeId={challengeId}
            owner={owner}
        />
    }


    render() {
        const {containerStyle} = styles;

        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
                style={containerStyle}
            />

        );
    }

}

const styles = {
    containerStyle: {
        marginBottom: 65
    }
};



const mapStateToProps = ({doAChallenge}) => {
    const {timelineTop} = doAChallenge;
    const timelineList = _.map(timelineTop, (val, uid) => {
        return {...val, uid};
    });

   const data = _.sortBy(timelineList, ['votes','postedAt'], ['desc', 'asc']);

    return {data};
};

export default connect(mapStateToProps, {fetchTimelineTop}) (DoAChallengeTimelineTop);
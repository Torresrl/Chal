import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card, CardSection} from '../../common';

class ShowChallengesListItem extends Component {

    onRowPress(){
        const {challengesId, owner} = this.props.challenges;
        const {challenge} = this.props;

        Actions.doAChallenge({
            challenge: challenge,
            challengesId: challengesId,
            owner: owner})
    }

    render(){
        const {name, description} = this.props.challenge;

        return(
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <Card>
                    <CardSection>
                        <Text style={styles.nameStyle}>{name}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.descriptionStyle}>{description}</Text>
                    </CardSection>
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {

    nameStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    descriptionStyle: {
        fontSize: 15
    },


};

export default ShowChallengesListItem;
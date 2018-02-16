import React, {Component} from 'react';
import {Text,View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Card} from '../../common';

class ChallengesListItem extends Component {

    onRowPress(){
        Actions.showChallenges({challenges: this.props.challenges});
    }

    render(){
        const {name} = this.props.challenges;

        return (

            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View>
                    <Card style={styles.cardStyle}>
                        <Text>{name}</Text>
                    </Card>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = {
    cardStyle: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 5,
        height: 40,
        justifyContent: 'center'
    }
};

export default ChallengesListItem;
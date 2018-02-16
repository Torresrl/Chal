import React, {Component} from 'react';
import {ListView, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, Spinner} from '../../common';
import ChallengesList from './ChallengesList';




class Challenges extends Component {



    //Denne kobles opp i router
    static renderRightButton = () =>{
        return(
            <Button
                style={styles.styleAddChal}
                onPress={ () => {Actions.findChallenges()}}>
                +
            </Button>
        );
    };

    static renderLeftButton = () => {
        return (
            <Button
                style={styles.styleAddChal}
                onPress={ () => {Actions.newChallenges()}}>
                create new
            </Button>
        );
    };

    renderContent () {
        if(this.props.load) {
             return (
                 <Spinner/>
             );
        }
        return (
            <ChallengesList/>
        );
    }
    render() {

        return(
            <View style={styles.containerStyle}>
                {this.renderContent()}
            </View>
        );
    }
}


const styles = {
    containerStyle: {

        flex:1
    },
    styleAddChal: {
        alignItems: 'center',
        justifyContent: 'center'
    }

};

const mapStateToProps = ({challenges}) => {
    const {load} = challenges;
    return {load};

};


export default connect (mapStateToProps) (Challenges);
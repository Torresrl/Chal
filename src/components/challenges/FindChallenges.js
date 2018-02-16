import React, {Component} from 'react';
import {Modal, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Input, Button, CardSection} from '../common';
import {codeChange,joinChallenges} from '../../Actions';

class ChallengesModal extends Component{

    onCodeChange(text){
        this.props.codeChange(text);
    }

    onAddButtonPress(){
        const {code} = this.props;
        this.props.joinChallenges(code);
    }

    render() {
        const {
            modalContainerStyle,
            inputStyle,
            inputContainerStyle,
            buttonsContainerStyle,
            buttonStyle,
            inputLabelStyle,
            errorStyle
        } = styles;

        const {code, error} = this.props;

        return (

                <View style={modalContainerStyle}>
                    <View style={inputContainerStyle}>
                        <Input
                            placeholder="KpFtz0kg0DNKpZSTugn"
                            label="Code:"
                            style = {inputStyle}
                            labelStyle = {inputLabelStyle}
                            onChangeText={this.onCodeChange.bind(this)}
                            value={code}
                        />
                        <Text style={errorStyle}>{error}</Text>
                    </View>


                    <CardSection style={buttonsContainerStyle}>
                        <Button
                            style={buttonStyle}
                            onPress={() => {this.onAddButtonPress()}}
                        >
                            Add
                        </Button>
                    </CardSection>
                </View>


        );
    }
}

const styles = {
    modalContainerStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 80,
        marginBottom: 80,
        backgroundColor: 'white'
    },


    inputContainerStyle: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputStyle: {
        borderWidth: 1,
        borderColor: "black",
        height: 50,
        flex: 0
    },

    inputLabelStyle: {
        flex: 1
    },

    buttonsContainerStyle: {
        flex: 1,
    },

    buttonStyle: {
        borderWidth: 1
    },

    errorStyle: {
        color: 'red'
    }

};

const mapStateToProps = ({findChallenges}) => {
    const{code, error} = findChallenges;
    return {code, error};
};



export default connect(mapStateToProps, {codeChange, joinChallenges}) (ChallengesModal);
import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, Image, ScrollView, View, Modal} from 'react-native';
import {connect} from 'react-redux';
import {Button, Input, Card, CardSection, Spinner, LargInput} from '../../common';
import AddChallengeList from './AddChallengeList';
import EditChallenge from './EditChallenge';
import {nameChange,
    descriptionChange,
    addImage,
    makeModalNotVisible,
    takePhoto,
    uploadPhoto
}from '../../../Actions';



class NewChallenges extends Component {

    onNameChange(text){
        this.props.nameChange(text);
    }

    onDesChange(text){
        this.props.descriptionChange(text);
    }

    onAddImage(text){
        this.props.addImage(text);

    }

    makeModalNotVisible(){
        this.props.makeModalNotVisible();
    }


    renderPicture(){
        const {image} = this.props;
        const{styleFirstCard, imageStyle, chooseImageContainer} = styles;
        if(image){
            return (
                <Card style={styleFirstCard}>
                    <CardSection>
                        <Image source={{uri: image.uri}}  style={imageStyle}/>
                    </CardSection>
                    <CardSection style={chooseImageContainer}>
                        <Button
                            onPress={() => {this.chooseImage()}}
                            iconName={'photo'}
                            iconSize={35}
                        >
                            Choose Image
                        </Button>
                        <Button
                            onPress={() => {this.takeImage()}}
                            iconName={'camera-alt'}
                            iconSize={35}
                        >
                            Take Image
                        </Button>
                    </CardSection>
                </Card>
            );
        } else {
            return (
                <Card style={styleFirstCard}>
                    <CardSection style={chooseImageContainer}>
                        <Button
                            onPress={() => {this.chooseImage()}}
                            iconName={'photo'}
                            iconSize={35}

                        />

                        <Button
                            onPress={() => {this.takeImage()}}
                            iconName={'camera-alt'}
                            iconSize={35}
                        />

                    </CardSection>
                </Card>
            );
        }
    }

    async chooseImage() {
        let response = await uploadPhoto();
        if(response != null) {
            this.onAddImage(response);
        }
    }

    async takeImage() {
        let response = await takePhoto();
        if(response != null){
            this.onAddImage(response)
        }
    }

    renderModal(){
        const {
            modalVisible,
            nameChallenges,
            challengesCode
        } = this.props;

        const {
            modalContainerStyle,
            modalCodeStyle,
            modalButtonStyle,
            modalHeaderStyle
        } = styles;
        return (
                <Modal
                    transparent={false}
                    visible={modalVisible}
                >
                    <View style={modalContainerStyle}>
                        <Text style={modalHeaderStyle}>{nameChallenges}</Text>
                        <Text style={modalCodeStyle}>Code: {challengesCode}</Text>
                        <Button
                            style={modalButtonStyle}
                            onPress={() => this.makeModalNotVisible()}
                        >
                            OK
                        </Button>
                    </View>
                </Modal>
        );

    }

    renderContent() {
        const {nameChallenges, description, challengesError, load} = this.props;
        if(load) {
            return (
                <View style = { styles.spinnerContainerStyle}>
                    <Spinner size="large"/>
                </View>
            );
        }

        return (
            <KeyboardAvoidingView  keyboardVerticalOffset={45} behavior={"position"}>
            <ScrollView >
                {this.renderPicture()}
                <Card>
                    <CardSection>
                        <Input
                            label="Name"
                            placeholder ="Name"
                            onChangeText={this.onNameChange.bind(this)}
                            value={nameChallenges}
                        />

                    </CardSection>
                    <CardSection>
                        <LargInput
                            label="Description"
                            placeholder="Description"
                            onChangeText={this.onDesChange.bind(this)}
                            value={description}
                        />
                    </CardSection>
                </Card>

                <Text style={styles.errorTextStyle}>{challengesError}</Text>
                <AddChallengeList/>

                <EditChallenge
                    button1 = 'Add Challenge'
                    button2 = 'Submit'
                />
            </ScrollView>
            </KeyboardAvoidingView>

        );
    }

    render() {

        return(
            <View>
                {this.renderModal()}
                {this.renderContent()}
            </View>
            );
    }
}

const styles = {
    styleFirstCard: {
        marginTop: 70
    },

    imageStyle: {
        height: 300,
        flex:1,
        width: null
    },

    errorTextStyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    },

    spinnerContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300

    },

    modalContainerStyle: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 65,

    },

    modalHeaderStyle: {
        flex: 5,
        fontSize: 25
    },

    modalCodeStyle: {
        fontSize: 20,
        color: "red",
        flex: 8
    },

    modalButtonStyle: {
        borderWidth: 1,
        flex: 1,
        marginBottom: 10

    },

    chooseImageContainer: {
        justifyContent: 'space-around',
        paddingBottom: 0
    }

};

const mapStateToProps = ({newChallenges}) =>{
    const {
        nameChallenges,
        description,
        image,
        challengeName,
        challengeDes,
        challengesError,
        load,
        challengesCode,
        modalVisible
    } = newChallenges;

    return {
        nameChallenges,
        description,
        image,
        challengeName,
        challengeDes,
        challengesError,
        load,
        challengesCode,
        modalVisible
    };
};

export default connect(mapStateToProps, {
        nameChange,
        descriptionChange,
        addImage,
    makeModalNotVisible,
    takePhoto,
    uploadPhoto
    })(NewChallenges);
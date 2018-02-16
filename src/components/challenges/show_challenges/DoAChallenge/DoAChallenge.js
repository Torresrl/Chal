import React, {Component} from 'react';
import firebase from 'firebase';
import {ScrollView, Text, Image, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {takePhoto, uploadPhoto} from '../../../../Actions';

import {
    Button,
    LargInput,
    Card,
    CardSection,
    Spinner
} from '../../../common';
import {
    commentChange,
    addImageChallenge,
    challengDone,
    getCurrentUserComment,
    doAChallengeNavBar
} from '../../../../Actions';
import DoAChallengeTimeline from './DoAChallengeTimeline';
import DoAChallengeTimelineTop from './DoAChallengeTimelineTop';


class DoAChallenge extends Component {

    constructor() {
        super();
        this.state = {
            imageUrl: '',
            followers: {}
        };
    }

    componentWillMount(){
        const{challengesId} = this.props;
        const{challengeId, done} = this.props.challenge;
        const {currentUser} = firebase.auth();

        if(done){
            this.props.getCurrentUserComment(challengesId, challengeId);

            firebase.storage()
                .ref('challenges/' + challengesId + '/'+ challengeId +
                    '/timeline/' + currentUser.uid).getDownloadURL()
                .then((url) => {
                    this.setState({imageUrl: url});
                });
        }
    }

    componentDidMount() {
        const {challengesId} = this.props;
        const database = firebase.database();
        database
            .ref('/challenges/' + challengesId + '/followers')
            .on('value', snap => {
                if(snap.val() != null) {
                    this.setState({
                        followers: Object.keys(snap.val())
                    });
                }
            } );
    }

    navBar(chooseList){
        this.props.doAChallengeNavBar(chooseList);
    }

    commentOnChange(text){
        this.props.commentChange(text);
    }

    onAddImage(text){
        this.props.addImageChallenge(text);
    }

    onChallengeFinished(){
        const {image, comment, challengesId, challenge, owner} = this.props;
        const database = firebase.database();

        database
            .ref('/challenges/' + challengesId + '/followers')
            .on('value', snap => {
                if(snap.val() != null) {
                    this.setState({
                        followers: Object.keys(snap.val())
                    });
                }
            } );

        this.props.challengDone({
            image,
            comment,
            challengeId: challenge.challengeId,
            challengesId,
            owner,
            followers: this.state.followers});
    }

//TODO: gjøre denne om til egen common
    async chooseImage() {
        let response = await uploadPhoto();
        if(response != null) {
            this.onAddImage(response.base64);
        }
        /*

        const options = {
            quality: 0
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                //let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.onAddImage(response.data);
            }
        });
        */

    }

    renderPictureNotDone() {
        const {image} = this.props;
        const{imageStyle} = styles;
        if(image){
            return (
                <Card>
                    <CardSection>
                        <Image source={{uri: `data:image/gif;base64,${image}`}}  style={imageStyle}/>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => {this.chooseImage()}}>
                            Change Picture
                        </Button>
                    </CardSection>
                </Card>
            );
        } else {
            return (
                <Card>
                    <CardSection>
                        <Button onPress={() => {this.chooseImage()}}>
                            Add Image
                        </Button>
                    </CardSection>
                </Card>
            );
        }
    }

    renderPictureDone() {
        const {imageUrl} = this.state;
        const {imageStyle} = styles;

        if(imageUrl.length == null || imageUrl.length === 0){
            return (
                <Spinner
                    size="small"
                    style={imageStyle}
                />
            )
        } else {
            return(
                <Image
                    source={{uri: this.state.imageUrl}}
                    style={imageStyle}/>
            )
        }
    }

    renderContentDoneOrNot() {
        const{done} = this.props.challenge;
        const{comment} = this.props;
        const {
            CommentCardStyle,
            styleButtonCard,
            styleButton,
        } = styles;

        if(done){
            return (
                <View>
                    <Card>
                        <CardSection>
                            {this.renderPictureDone()}
                        </CardSection>
                        <CardSection>
                            <Text>
                                {comment}
                            </Text>
                        </CardSection>
                    </Card>
                </View>
            )
        } else {
            return (
                <View>
                    {this.renderPictureNotDone()}
                    <Card style={CommentCardStyle}>
                        <LargInput
                            label="Comment"
                            placeholder="Give a comment"
                            onChangeText={this.commentOnChange.bind(this)}
                            value={comment}
                        />
                    </Card>

                    <Card style={styleButtonCard}>
                        <Button
                            style={styleButton}
                            onPress={() => this.onChallengeFinished()}
                        >
                            Confirm
                        </Button>
                    </Card>
                </View>
            )
        }
    }

    //henter liste ut i fra navBar,
    renderList(){
        const {navBar} = this.props;
        const{challengeId} = this.props.challenge;
        const {challengesId, owner} = this.props;

        switch (navBar) {
            case "all":
                return (
                    <DoAChallengeTimeline
                challengesId={challengesId}
                challengeId={challengeId}
                owner={owner}
                    />
            );
            case "friends":
                return (
                    <View>
                        <Text>Frinds</Text>
                    </View>
                    );
            case "top":
                return(
                    <DoAChallengeTimelineTop
                        challengesId={challengesId}
                        challengeId={challengeId}
                        owner={owner}
                    />
                );
            default:
                return(
                    <DoAChallengeTimeline
                        challengesId={challengesId}
                        challengeId={challengeId}
                        owner={owner}
                    />
                );

        }
    }

    render(){
        const{name, description, challengeId} = this.props.challenge;
        const {challengesId, owner, error} = this.props;
        const {
            headerStyle,
            headerCardStyle,
            errorTextStyle
        } = styles;

        return(
            <ScrollView>
                <Card style={headerCardStyle}>
                    <CardSection>
                        <Text style={headerStyle}>{name}</Text>
                    </CardSection>
                    <CardSection>
                        <Text>{description}</Text>
                    </CardSection>
                </Card>
                {this.renderContentDoneOrNot()}
                <Text style={errorTextStyle}>{error}</Text>
                <CardSection>
                    <Button onPress={() => this.navBar('all')}>
                        All
                    </Button>
                    <Button onPress= {() => this.navBar('friends')}>
                        Friends
                    </Button>
                    <Button onPress= {() => this.navBar('top')}>
                        Top
                    </Button>
                </CardSection>
                <CardSection>
                    {this.renderList()}
                </CardSection>

            </ScrollView>
        );
    }
}

const styles = {


    headerStyle: {
        fontSize: 22,

    },

    headerCardStyle: {
        marginTop: 70,
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5,
        flex: 2
    },

    CommentCardStyle: {
        alignSelf: 'stretch',
        marginLeft: 5,
        marginRight: 5,
        flex: 3
    },
    imageStyle: {
        height: 300,
        flex:1,
        width: null
    },

    styleButtonCard: {
        borderWidth: 0,
        shadowColor: '#FFF',
        flexDirection: 'row',
        marginBottom: 10
    },
    styleButton: {
        borderWidth: 1
    },

    errorTextStyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    }



};

const mapStateToProps = ({doAChallenge}) => {
    const {image, comment, error, navBar} = doAChallenge;
    return {image, comment, error, navBar};
};

export default connect(mapStateToProps,
    {
        commentChange,
        addImageChallenge,
        challengDone,
        getCurrentUserComment,
        doAChallengeNavBar
    }) (DoAChallenge);
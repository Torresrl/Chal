import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import firebase from 'firebase';
import {Card, Spinner, CardSection, Button} from '../../common';

/*
Read me:

Denne bruker ikke redux, så allt som skjer er inni denne filen.
Grunnen er at jeg ikke vil at staten skal være like i alle list items.


for gjenbruk trenger den propsene:
chellengeId,
challengesId
owner
post = {alle propsene i en challenge}
 */


class TimelineItem extends Component {

    constructor(){
        super();
        this.state = {
            imageUrl: '',
            followers: {}
        };
    }

    componentWillMount(){
        const {image} = this.props.post;

        firebase.storage()
            .ref(image).getDownloadURL()
            .then((url) => {
                this.setState({imageUrl: url});
            }).catch((error) => {
                this.setState({imageUrl: require('../../../recourses/defaultImages/NoImage.png')})
        });
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


    //Database funskjoner:
    updateVotes(upVote){ //upVote
        const {challengesId} = this.props;

        let votes = parseInt(this.props.post.votes);
        const database = firebase.database();

        if(upVote){
            votes = votes + 1;
        } else {
            votes = votes - 1;
        }


        //denne linjen henter ikke ut daten sikkelig ....
        //legge det til i component vil mount med en dispatcher, da vil vell staten bli soten når det passer den
        database
            .ref('/challenges/' + challengesId + '/followers')
            .on('value', snap => {
                if( snap.val() != null) {
                    this.setState({
                        followers: Object.keys(snap.val())
                    });
                }
            } );

        let fanoutObj = this.fanoutPost({
            votes: votes
        });

        database.ref().update(fanoutObj);

    }

    //lager fanout object, gjør sånn du får atmoic update for voting
    fanoutPost = ({votes}) => {
        const {currentUser} = firebase.auth();
        const {challengesId, challengeId, owner} = this.props;
        const {userId} = this.props.post;
        const {followers} = this.state;

        let fanoutObj = {};

        console.log(followers);

        if(followers && followers.length > 0) {
            followers.forEach((key) => fanoutObj[
            '/Users/' + key +
            '/myChallenges/' + challengesId +
            '/challenges/' + challengeId +
            '/timeline/' + userId +
            '/votes'] = votes);
        }

        fanoutObj['/Users/' + currentUser.uid +
        '/myChallenges/' + challengesId +
        '/challenges/' + challengeId +
        '/timeline/' + userId +
        '/voted'] = true;

        fanoutObj[
        '/Users/' + owner +
        '/myChallenges/' + challengesId +
        '/challenges/' +challengeId +
        '/timeline/' + userId +
        '/votes'] = votes;

        fanoutObj[
        '/challenges/' + challengesId +
        '/challenges/' +challengeId +
        '/timeline/' + userId +
        '/votes'] = votes;



        return fanoutObj;

    };


    getWeekDay(dayInWeek){
        switch (dayInWeek) {
            case 0:
                return 'Monday';
            case 1:
                return 'Tuesday';
            case 2:
                return 'Wednesday';
            case 3:
                return 'Thursday';
            case 4:
                return 'Friday';
            case 5:
                return 'Saturday';
            case 6:
                return 'Sunday';
            default:
                return '------';
        }
    }

    getMonth(month){
        switch (month) {
            case 1:
                return 'January';
            case 2:
                return 'Februar';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
        }
    }




    renderImage(){
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
            return (
                //Link: https://github.com/oblador/react-native-image-progress/issues/22
                <Image
                    source={{uri: this.state.imageUrl}}
                    style={imageStyle}

                />

            )
        }

    }


    renderVotes(){
        const {voted, votes} = this.props.post;
        const {buttonContainer, styleVotes} = styles;

        if(voted){
            return (
                <View style={buttonContainer}>
                    <Text style={styleVotes}>
                        votes: {votes}
                    </Text>
                </View>
            );

        } else {
            return (
                <View style={buttonContainer}>
                    <Button onPress={() => {this.updateVotes(true)}}>
                        Up
                    </Button>
                    <Button onPress={() => {this.updateVotes(false)}}>
                        Down
                    </Button>
                    <Text style={styleVotes}>
                        {votes}
                    </Text>
                </View>
            );
        }
    }



    render(){
        const {comment, userName, postedAt} = this.props.post;
        const {buttonContainer, commentContainer, styleDate} = styles;

        //datoene er i millisekunder
        const postDate = parseInt(postedAt);

        //dagen i dag i millisekunder
        let todaysDate = new Date().getTime();

        //datoen som skal vises
        let postDateString = '';
        const postDateObject = new Date(postDate);

        //sjekker om posten ble laget innen en dag
        if(postDate + 86400000 > todaysDate){
            postDateString = postDateObject.getHours()
                + '.' + postDateObject.getMinutes();

            //sjekker om posten ble laget innen en uke
        } else if (postDate + 604800000 > todaysDate){
            postDateString = this.getWeekDay(postDateObject.getDay())
                + ' ' + postDateObject.getHours()
                + '.' + postDateObject.getMinutes();

            //sjekker om posten ble laget i år
        } else if(postDate + 31536000000 > todaysDate) {
            postDateString = postDateObject.getDay()
                + ' ' + this.getMonth(postDateObject.getMonth())
                + ' ' + postDateObject.getHours()
                + '.' + postDateObject.getMinutes();

        } else {
            postDateString = postDateObject.getDay() + '/' +
                postDateObject.getMonth() + '/' +
                postDateObject.getYear();
        }


        return (
            <Card>
                <CardSection>
                    <Text>
                        {userName}
                    </Text>
                </CardSection>
                <CardSection>
                    <Text style={styleDate}>
                        {postDateString}
                    </Text>
                </CardSection>
                {this.renderImage()}
                <CardSection>
                    <Text
                        style={commentContainer}
                    >
                        {comment}
                    </Text>
                </CardSection>
                <CardSection>
                    <View style={buttonContainer}>
                        <Button>
                            comment
                        </Button>
                    </View>
                    {this.renderVotes()}
                </CardSection>

            </Card>
        )
    }
}

const styles = {
    imageStyle: {
        flex: 1,
        height: 300
    },

    commentContainer: {
      marginBottom: 5
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row'

    },

    styleDate: {
        fontSize: 12,
        fontStyle: 'italic'
    },

    styleVotes: {
        paddingTop: 10,
        paddingBottom: 10,
    }

};



export default TimelineItem;
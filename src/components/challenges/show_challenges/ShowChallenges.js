import React, {Component} from 'react';
import {
    Text,
    ScrollView,
    Image,
    ListView,
    TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getImage} from '../../../Actions';
import {Spinner, Card, CardSection, Button} from '../../common';
import ShowChallengesListItem from './ShowChallengesListItem';


class ShowChallenges extends Component {

    componentWillMount(){
        const{challengesId, challenges, mainImage} = this.props.challenges;
        const challengeList = _.map(challenges, (val, uid) => {
            return {...val, uid}
        });
        this.setState({challengeList});
        console.log(challengeList);

        if(mainImage) {
            this.props.getImage(challengesId);
        }
    }

    //Sorterer listen etter hva brukeren vil se (all, done eller notDone)
    navBar(chooseList){
        const{challenges} = this.props.challenges;
        let challengeList = null;

        console.log(challenges);

        if (chooseList == 'all' && challenges !== undefined) {
            challengeList = _.map(challenges, (val, uid) => {
                return {...val, uid}
            });
        }

        else if(chooseList == 'done' && challenges !== undefined){
            challengeList = challenges.filter(challenges => {
                if (challenges.done == true) {
                    return challenges;
                }
            });

        } else if(chooseList == 'notDone' && challenges !== undefined){
            challengeList = challenges.filter(challenges => {
                if (challenges.done == false) {
                    return challenges;
                }
            });
        }

        const challengeList2 = _.map(challengeList, (val, uid) => {
            return {...val, uid};
        });

        this.setState({challengeList: challengeList2});
    }

    createDataSource(){
        const {challengeList} = this.state;
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(challengeList);
    }


    renderRow(challenge){ //det er denne som må sjekke om challengen er done eller ikke
        return ( //bruk DoAChallenge som insperasjon, linje 217 til 251
            <ShowChallengesListItem
                challenge={challenge}
                challenges={this.props.challenges}
            />
        );
    }

    renderImage() {
        const{mainImage} = this.props.challenges;
        const {url, load} = this.props;
        const {imageStyle} = styles;

        if(mainImage) {
            if (load) {
                return (
                    <Spinner/>
                );

            }
            return (
                <Image
                    source={{uri: url}}
                    style={imageStyle}
                />
            );
        } else {
            return(
                <Text>Her kan me ha et dummy bilde</Text>
            );
        }

    }


    render() {
        const {name, description, challengesId} = this.props.challenges;
        const {
            ContainerStyle,
            headerCardStyle,
            headerStyle,
            codeStyle
        } = styles;

        this.createDataSource();

        return (
            <ScrollView style={ContainerStyle}>
                <Card style={{margin: 0}}>
                    <CardSection style={{padding: 0}}>
                        {this.renderImage()}
                    </CardSection>
                </Card>
                <Card style={headerCardStyle}>
                    <Text style={headerStyle}>{name}</Text>
                    <Text style={codeStyle}>Code: {challengesId}</Text>
                    <Text>{description}</Text>
                </Card>
                <CardSection>
                    <Button onPress={() => this.navBar('all')}>
                        All
                    </Button>
                    <Button onPress={() => this.navBar('done')}>
                        Done
                    </Button>
                    <Button onPress={() => this.navBar('notDone')}>
                        Not Done
                    </Button>
                </CardSection>

                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}
                />
            </ScrollView>
        );
    }
}

const styles = {
    ContainerStyle: {
        flex: 1,
        //marginTop: 65,
        //marginBottom: 65

    },
    imageStyle: {
        flex: 1,
        height: 300
    },

    headerCardStyle: {
        alignItems: 'center',
        shadowRadius: 0,
        borderWidth: 0,
    },

    headerStyle: {
        fontSize: 20,
        marginBottom: 10
    },
    nameStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    descriptionStyle: {
        fontSize: 15
    },

    codeStyle: {
        color: 'red'
    }

};

const mapStateToProps = ({showChallenges}) => {
    const {url, load, navBar} = showChallenges;
    return {url, load, navBar};

};

export default connect(mapStateToProps, {getImage})(ShowChallenges);
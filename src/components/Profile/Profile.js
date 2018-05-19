import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  userInfoFetch
 } from '../../Actions';
import { Card, CardSection } from '../common';

class Profile extends Component {

  componentWillMount() {
    this.props.userInfoFetch();
    console.log('Profile picture fetch successful');
  }


  saveUserUpdate = () => {
    const { displayName } = this.props;
    this.props.saveUserUpdate({ displayName });
  };

  renderProfilePicture() {
      const { imageStyle} = styles;
      const {profilePicture, user} = this.props;

      if (profilePicture || user.photoURL) {
          return (
              <CardSection>
                  <Image
                      source={{uri: profilePicture || user.photoURL}}
                      style={imageStyle}
                  />
              </CardSection>
          )
      } else {
          return (
              <View>
              </View>
          )
      }
  }


  render() {
    const {textStyleLocal} = styles;
    const {user, name} = this.props;


      return (
          <Card>
              {this.renderProfilePicture()}

              <CardSection>
                  <Text style={textStyleLocal}>{name || user.displayName}</Text>
              </CardSection>
              <CardSection>
                  <Text style={textStyleLocal}>Display random stuff here</Text>
              </CardSection>
              <CardSection>
                  <Text style={textStyleLocal}>Display random stuff here</Text>
              </CardSection>
              <CardSection>
                  <Text style={textStyleLocal}>Display random stuff here</Text>
              </CardSection>
              <CardSection>
                  <Text style={textStyleLocal}>Peace out</Text>
              </CardSection>
          </Card>
      );


  }
}

const styles = {


    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },

    textStyleLocal: {
      fontSize: 18,
      paddingLeft: 6
    }

};


const mapStateToProps = ({ profile }) => {
  const {
    user,
    name,
    profilePicture} = profile;

  return {
     user,
     name,
     profilePicture};
};

export default connect(mapStateToProps, { userInfoFetch })(Profile);

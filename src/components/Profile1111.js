import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { userInfoFetch } from '../Actions';
import { Card, CardSection } from './common';


//Enable componentWillMount method for
//fetching user specific profile picture
//
//Currently setting default profile image


class Profile extends Component {


  componentWillMount() {
    this.props.userInfoFetch();
    console.log('Profile picture fetch successful');
  }

  render() {
    const { imageStyle, textStyle } = styles;
      return (
          <Card>
            <CardSection>
              <Image
              source={{ uri: this.props.user.photoURL }}
              style={imageStyle}
              />
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Name: {this.props.user.displayName}</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Display random stuff here</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Display random stuff here</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Display random stuff here</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Peace out</Text>
            </CardSection>
          </Card>
      );
  }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    },

    textStyle: {
      fontSize: 18,
      paddingLeft: 6
    }

};

const mapStateToProps = ({ profile }) => {
  const { user } = profile;

  return { user };
};

export default connect(mapStateToProps, { userInfoFetch })(Profile);

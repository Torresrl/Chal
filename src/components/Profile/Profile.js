import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';
import {
  userInfoFetch,
  addProfilePic,
  uploadUpdateProfilePicture
 } from '../../Actions';
import { Card, CardSection, Button } from '../common';

class Profile extends Component {


  componentWillMount() {
    this.props.userInfoFetch();
    console.log('Profile picture fetch successful');
  }

  onAddImage(text) {
    this.props.addProfilePic(text);
  }

  onUploadPicture(uri) {
    this.props.uploadUpdateProfilePicture(uri);
  }

  saveUserUpdate = () => {
    const { displayName, phoneNumber } = this.props;
    this.props.saveUserUpdate({ displayName, phoneNumber });
  };

  chooseImage() {
    const options = {
        quality: 0
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Cancel by user');
      } else if (response.error) {
        console.log('ImagePicker error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.onAddImage(response.uri);
      }
    });
  }

  render() {
    const { imageStyle, textStyle, styleFirstCard, styleButton } = styles;

    if (this.props.render_profile_pic) {
      return (
        <View style={styleFirstCard}>
          <Card>
            <CardSection>
              <Image
              source={{ uri: this.props.chosen_picture_uri }}
              style={imageStyle} />
            </CardSection>

            <CardSection>
              <Button
                style={styleButton} onPress={() => {
                  this.onUploadPicture(this.props.chosen_picture_uri);
                }}>
                  Allright
                </Button>
              </CardSection>
              <CardSection>
              <Button
                  style={styleButton} onPress={() => {
                    this.chooseImage();
                  }}>
                  Retake
                </Button>
            </CardSection>
            <Text style={styles.errorTextStyle}>
              { this.props.error }
            </Text>
          </Card>
        </View>
      );
    }

      return (
          <Card>
            <TouchableOpacity onPress={() => this.chooseImage()}>
              <CardSection>
                <Image
                source={{ uri: this.props.profilePicture || this.props.user.photoURL }}
                style={imageStyle}
                />
              </CardSection>
            </TouchableOpacity>
            <CardSection>
              <Text style={textStyle}>Name: {this.props.name || this.props.user.displayName}</Text>
            </CardSection>
            <CardSection>
              <Text style={textStyle}>Phone: {this.props.phoneNumber || this.props.user.phoneNumber}</Text>
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
    },
    styleFirstCard: {
      marginTop: 70
    },

    styleCard: {
      justifyContent: 'center',
      alignItems: 'center'
    },
      errorTextStyle: {
          color: 'red',
          fontSize: 18,
          alignSelf: 'center'
      },

      spinnerStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 250

      },
      cardStyle: {
          marginTop: 70
      },
      styleButton: {
          borderWidth: 1
      },


};


const mapStateToProps = ({ profile }) => {
  const {
    user,
    name,
    profilePicture,
    phoneNumber,
    render_profile_pic,
    chosen_picture_uri } = profile;

  return {
     user,
     name,
     profilePicture,
     phoneNumber,
     render_profile_pic,
     chosen_picture_uri };
};

export default connect(mapStateToProps, { userInfoFetch, addProfilePic, uploadUpdateProfilePicture })(Profile);

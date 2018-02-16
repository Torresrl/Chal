import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import {
  addProfilePic,
  uploadUpdateProfilePicture } from '../../Actions';


class DisplayProfilePicture extends Component {


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
    const { styleFirstCard, imageStyle, styleButton } = styles;

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
      <View style={styleFirstCard}>
      <CardSection>
        <Image
        source={{ uri: this.props.user.photoURL }}
        style={imageStyle} />
      </CardSection>
      <CardSection>
      <Button
          style={styleButton} onPress={() => {
            this.chooseImage();
          }}>
          Retake
        </Button>
    </CardSection>
      </View>
    );
  }
}

const styles = {
  styleFirstCard: {
    marginTop: 70
  },

  styleCard: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageStyle: {
      height: 300,
      flex: 1,
      width: null
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
  const { render_profile_pic, chosen_picture_uri, user } = profile;

  return { render_profile_pic, chosen_picture_uri, user };
};


export default connect(mapStateToProps,
  { addProfilePic, uploadUpdateProfilePicture })(DisplayProfilePicture);

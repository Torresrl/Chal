import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, ImageGetter } from '../common';
import {
  addProfilePic,
  uploadUpdateProfilePicture
} from '../../Actions';


class DisplayProfilePicture extends Component {

  //uploads image to firebase
  onUploadPicture = (uri) =>  {
    this.props.uploadUpdateProfilePicture(uri);
  };

  saveUserUpdate = () => {
    const { displayName, phoneNumber, saveUserUpdate } = this.props;
    saveUserUpdate({ displayName, phoneNumber });
  };


  render() {
    const { styleFirstCard, imageStyle, styleButton, chooseImageContainer } = styles;
    const {chosen_picture_uri, render_profile_pic, user} = this.props;

    if (render_profile_pic) {
      return (
        <View style={styleFirstCard}>
          <Card>
            <CardSection>
              <Image
              source={{ uri: chosen_picture_uri.uri }}
              style={imageStyle} />
            </CardSection>

            <CardSection>
              <Button
                style={styleButton} onPress={() => {
                  this.onUploadPicture(chosen_picture_uri.uri);
                }}>
                  Allright
                </Button>
              </CardSection>

              <ImageGetter onAddImage={(response) => this.props.addProfilePic(response)}/>

            <Text style={styles.errorTextStyle}>
              { this.props.error }
            </Text>
          </Card>
        </View>
      );
    } else return (
      <View style={styleFirstCard}>
      <CardSection>
        <Image
        source={{ uri: user.photoURL }}
        style={imageStyle} />
      </CardSection>


          <ImageGetter onAddImage={(response) => this.props.addProfilePic(response)}/>

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

    chooseImageContainer: {
        justifyContent: 'space-around',
        paddingBottom: 0
    }

  };

const mapStateToProps = ({ profile }) => {
  const { render_profile_pic, chosen_picture_uri, user } = profile;

  return { render_profile_pic, chosen_picture_uri, user };
};


export default connect(mapStateToProps,
  { addProfilePic, uploadUpdateProfilePicture })(DisplayProfilePicture);

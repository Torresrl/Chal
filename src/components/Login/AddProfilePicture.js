import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Card, Button } from '../common';
import { addProfilePic, uploadProfilePicture } from '../../Actions';


class AddProfilePicture extends Component {

  onAddImage(text) {
    this.props.addProfilePic(text);
  }

  onUploadPicture(uri) {
    this.props.uploadProfilePicture(uri);
  }

  skip() {
    Actions.main({ type: 'reset' });
  }

  chooseImage() {
    ImagePicker.showImagePicker(null, (response) => {
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

  renderPicture() {
    const { styleFirstCard, imageStyle, styleButton, styleCard } = styles;
    if (this.props.render_profile_pic) {
      return (
        <View>
          <Card>
            <CardSection>
              <Image
              source={{ uri: this.props.chosen_picture_uri }}
              style={imageStyle}/>
            </CardSection>

            <CardSection>
              <Button
                style={styleButton} onPress={() => {
                  this.onUploadPicture(this.props.chosen_picture_uri);
                }}>
                  Continue
                </Button>
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
        <Card style={styleCard}>
            <CardSection>
              <Button style={styleButton} onPress={() => { this.chooseImage(); }}>
              Add Picture
              </Button>
            </CardSection>
          </Card>
          <Card style={styleCard}>
              <CardSection>
              <Button style={styleButton} onPress={() => { this.skip(); }}>
              Skip</Button>
            </CardSection>
        </Card>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderPicture()}
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
  const { render_profile_pic, chosen_picture_uri, error } = profile;
  return { render_profile_pic, chosen_picture_uri, error };
};

export default connect(mapStateToProps, { addProfilePic, uploadProfilePicture })(AddProfilePicture);

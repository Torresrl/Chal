import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Card, Button, ImageGetter } from '../common';
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


  renderPicture() {
    const { imageStyle, styleButton, pageStyle} = styles;
    const {chosen_picture_uri, render_profile_pic, addProfilePic} = this.props;

    if (render_profile_pic) {
      return (
        <View style={pageStyle}>
          <Card>
            <CardSection>
              <Image
              source={{ uri: chosen_picture_uri }}
              style={imageStyle}/>
            </CardSection>

            <CardSection>
              <Button
                style={styleButton} onPress={() => {
                  this.onUploadPicture(chosen_picture_uri);
                }}>
                  Continue
                </Button>

            </CardSection>

              <ImageGetter onAddImage={(response) => addProfilePic(response.uri)}/>

            <Text style={styles.errorTextStyle}>
              { this.props.error }
            </Text>
          </Card>
        </View>
      );
    }
    return (
      <View style={pageStyle} >

          <Card>

              <ImageGetter onAddImage={(response) => addProfilePic(response.uri)}/>

              <CardSection>
              <Button style={styleButton} onPress={() => { this.skip(); }}>
              Skip
              </Button>
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

    pageStyle: {
        marginTop: 20
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
    styleButton: {
        borderWidth: 1
    },

  };

const mapStateToProps = ({ profile }) => {
  const { render_profile_pic, chosen_picture_uri, error } = profile;
  return { render_profile_pic, chosen_picture_uri, error };
};

export default connect(mapStateToProps, { addProfilePic, uploadProfilePicture })(AddProfilePicture);

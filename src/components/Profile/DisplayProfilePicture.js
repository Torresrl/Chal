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


  renderImage() {
      const {imageStyle, styleButton } = styles;
      const {chosen_picture_uri, render_profile_pic, user} = this.props;

      if (render_profile_pic) {
         return (
             <View>
                 <CardSection>
                     <Image
                         source={{ uri: chosen_picture_uri}}
                         style={imageStyle} />
                 </CardSection>

                 <CardSection>
                     <Button
                         style={styleButton} onPress={() => {
                         this.onUploadPicture(chosen_picture_uri);
                     }}>
                         Allright
                     </Button>
                 </CardSection>

             </View>
         )
      } else if (user.photoURL) {
          return (
              <View>
                  <CardSection>
                      <Image
                          source={{ uri: user.photoURL }}
                          style={imageStyle} />
                  </CardSection>

              </View>
          )
      } else {
          return (
              <View>
              </View>
          )
      }
  }


  render() {
    return (

        <Card>

            {this.renderImage()}
            <ImageGetter onAddImage={(response) => this.props.addProfilePic(response.uri)}/>
          <Text style={styles.errorTextStyle}>
            { this.props.error }
          </Text>
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

    errorTextStyle: {
        color: 'red',
        fontSize: 18,
        alignSelf: 'center'
    }



  };

const mapStateToProps = ({ profile }) => {
  const { render_profile_pic, chosen_picture_uri, user } = profile;

  return { render_profile_pic, chosen_picture_uri, user };
};


export default connect(mapStateToProps,
  { addProfilePic, uploadUpdateProfilePicture })(DisplayProfilePicture);

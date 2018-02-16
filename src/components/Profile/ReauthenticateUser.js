import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from '../common';
import { emailChange, passwordChange, reAuthenticate } from '../../Actions';

class ReauthenticateUser extends Component {

  onEmailChange(text) {
    this.props.emailChange(text);
  }

  onPasswordChange(text) {
    this.props.passwordChange(text);
  }

  onReauthenticate() {
    const { email, password, changedEmail } = this.props;

    this.props.reAuthenticate({ email, password, changedEmail });
  }

  render() {
    const { cardStyle, buttonStyle, spinnerStyle, errorTextStyle } = styles;
    const { email, password, load, error } = this.props;

    if (load) {
      return (
        <View style={spinnerStyle}>
          <Spinner size='large' />
        </View>
      );
    }
    return (
      <View>
        <Card style={cardStyle}>
          <CardSection>
            <Input
              placeholder="user@gmail.com"
              label="Email:"
              onChangeText={this.onEmailChange.bind(this)}
              value={email}
              />
            </CardSection>
            <CardSection>
              <Input
              secureTextEntry
              placeholder="password"
              label="Password:"
              onChangeText={this.onPasswordChange.bind(this)}
              value={password}
              />
            </CardSection>
            <Text style={errorTextStyle}> {error} </Text>
            <CardSection>
              <Button style={buttonStyle} onPress={this.onReauthenticate.bind(this)}>
                Re-authenticate
              </Button>
            </CardSection>
        </Card>
      </View>
    );
  }

}


const styles = {
  cardStyle: {
    marginTop: 70
  },
  buttonStyle: {
    borderWidth: 1
  },
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ auth, profile }) => {
  const { email, password, error, load, changedEmail } = auth;
  //const { changedEmail } = profile;

  return { email, password, error, load, changedEmail };
};

export default connect(mapStateToProps, { emailChange, passwordChange, reAuthenticate })(ReauthenticateUser);

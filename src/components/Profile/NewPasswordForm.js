import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../common';
import { Actions } from 'react-native-router-flux';
import { passwordChange, savePasswordChange, userCancel } from '../../Actions';

class NewPasswordForm extends Component {

  onPasswordChange(text) {
    this.props.passwordChange(text);
  }

  onSave() {
    const { password } = this.props;
    this.props.savePasswordChange({ password });
  }

  onCancel() {
    this.props.userCancel();
    Actions.profile({ type: 'reset' });
  }

  render() {
    const { cardStyle, buttonStyle, errorTextStyle } = styles;
    const { password, error } = this.props;

    return (
      <View>
        <Card style={cardStyle}>
          <CardSection>
            <Input
              secureTextEntry
              placeholder="new password"
              label="Password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={password}
            />
          </CardSection>

          <Text style={errorTextStyle}>{error}</Text>

          <CardSection>
            <Button style={buttonStyle} onPress={this.onSave.bind(this)}>
              Save
            </Button>
            </CardSection>
            <CardSection>
              <Button style={buttonStyle} onPress={this.onCancel.bind(this)}>
                Cancel
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
  errorTextStyle: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ auth }) => {
  const { password, error } = auth;

  return { password, error };
};

export default connect(mapStateToProps, { passwordChange, savePasswordChange, userCancel })(NewPasswordForm);

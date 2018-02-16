import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../common';
import { emailChange, saveEmailChange, userCancel } from '../../Actions';

class NewPasswordForm extends Component {

  onEmailChange(text) {
    this.props.emailChange(text);
  }

  onSave() {
    const { email } = this.props;
    this.props.saveEmailChange({ email });
  }

  onCancel() {
    this.props.userCancel();
    Actions.profile({ type: 'reset' });
  }

  render() {
    const { cardStyle, buttonStyle, errorTextStyle } = styles;
    const { email, error } = this.props;

    return (
      <View>
        <Card style={cardStyle}>
          <CardSection>
            <Input
              placeholder="user@gmail.com"
              label="Email"
              onChangeText={this.onEmailChange.bind(this)}
              value={email}
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
  const { email, error } = auth;

  return { email, error };
};

export default connect(mapStateToProps, { emailChange, saveEmailChange, userCancel })(NewPasswordForm);

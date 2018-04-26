import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Input, CardSection, Card, Button, Spinner} from '../common';
import {emailChange, passwordChange, loginUser} from '../../Actions';


class LoginForm extends Component {

    onEmailChange(text){
        this.props.emailChange(text);
    }

    onPasswordChange(text){
        this.props.passwordChange(text);
    }

    onNewUser(){
        Actions.newUser();
    }

    onLoginUser() {
        const {email, password} = this.props;
        this.props.loginUser({email, password});
    }

    renderContent() {
        const{email, password} = this.props;

        if(this.props.load){
            return (
                <View style={styles.spinnerStyle}>
                    <Spinner size="large"/>
                </View>
            )
        }

        return (
            <Card>
                <CardSection >
                    <Input
                        placeholder="user@gmail.com"
                        label="Email:"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={email}
                    />
                </CardSection>

                <CardSection >
                    <Input
                        secureTextEntry
                        placeholder="Password"
                        label="Password:"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={password}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>

                <CardSection>
                    <Button onPress={() => {this.onLoginUser()}}>
                        Login
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => {this.onNewUser()}}>
                        New User
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render () {
        return(
            <View>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'

    },

    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250

    }
};


const mapStateToProps = ({auth}) => {
    const{email, password, error, load } = auth;
    return {email, password, error, load};
};

export default connect(mapStateToProps, {
        emailChange,
        passwordChange,
        loginUser
    })(LoginForm);

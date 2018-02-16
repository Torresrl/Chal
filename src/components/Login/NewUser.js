import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Input, CardSection, Card, Button, Spinner} from '../common';
import {
    newEmailChange,
    newPasswordChange,
    createUser,
    newNameChange
} from '../../Actions';

class NewUser extends Component {

    onEmailChange(text){
        this.props.newEmailChange(text);
    }

    onPasswordChange(text) {
        this.props.newPasswordChange(text);
    }

    onNameChange(text) {
        this.props.newNameChange(text);
    }

    onSubmit() {
        const{email, password, name} = this.props;
        this.props.createUser({email, password, name});
    }

    renderContent() {
        const{email, password, name, load} = this.props;
        const{spinnerStyle, cardStyle, errorTextStyle, styleButton} = styles;

        if(load){
            return(
                <View style={spinnerStyle}>
                    <Spinner size="large"/>
                </View>
            )
        }

        return (

            <View>
                <Card style={cardStyle}>
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
                </Card>
                <Card>
                    <CardSection >
                        <Input
                            placeholder="Ole Nordman"
                            label="Name:"
                            onChangeText={this.onNameChange.bind(this)}
                            value={name}
                        />
                    </CardSection>
                </Card>

                    <Text style={errorTextStyle}>
                        {this.props.error}
                    </Text>

                    <CardSection>
                        <Button
                            onPress={ () => {this.onSubmit()}}
                            style={styleButton}
                        >
                            Submit
                        </Button>

                    </CardSection>

            </View>
        );
    }


    render() {
        return (
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

    },
    cardStyle: {
        marginTop: 70
    },
    styleButton: {
        borderWidth: 1
    }
};

const mapStateToProps = ({register}) => {
    const{email, password, name, error, load} = register;
    return {email, password, name, error, load};
};


export default connect(mapStateToProps, {newEmailChange, newPasswordChange, newNameChange, createUser})(NewUser);

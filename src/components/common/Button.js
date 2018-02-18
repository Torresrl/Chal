import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'

const Button = ({onPress, children, style, textStyle,  iconName, iconSize}) => {


    const { buttonStyle, textStyleLocal } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
            <Icon name={iconName} size={iconSize}/>
            <Text style={[textStyleLocal, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {

    textStyleLocal: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },

    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 5,
        borderWidth: 0,
        borderColor: 'black',
        marginLeft: 5,
        marginRight: 5
    }
};

export {Button};
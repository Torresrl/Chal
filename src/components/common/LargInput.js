import React from 'react';
import {TextInput, View, Text} from 'react-native';

const LargInput = ({
    label,
    numberOfLines,
    placeholder,
    onChangeText,
    value,
    style
}) => {

    const {containerStyle,localLabelStyle,inputStyle} = styles;

    return(
        <View style={[containerStyle, style]}>
            <Text style={localLabelStyle}>{label}</Text>
            <TextInput
                multiline={true}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={inputStyle}
            />
        </View>
    )
};

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
    },

    localLabelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
        paddingBottom: 10
    },

    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 20,
        fontSize: 15,
        lineHeight: 23,
        flex: 3,
        paddingBottom: 10
    },
};

export {LargInput}
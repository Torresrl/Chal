import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Feed extends Component {
    render() {
        return(
            <View style={styles.containerStyle}>
                <Text>Feed</Text>
            </View>
        );
    }
}

styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

};

export default Feed;
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListView, View, Text} from 'react-native';
import {Card, CardSection} from '../../common';

class AddChallengeList extends Component {


    renderRow(rowData){
        return (
                <Card>
                    <CardSection>
                        <Text style={styles.nameStyle}>{rowData.name}</Text>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.descriptionStyle}>{rowData.description}</Text>
                    </CardSection>
                </Card>
        );
    }


    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(this.props.challenges);

        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.dataSource}
                renderRow={(rowData) => this.renderRow(rowData)}
            />
        );
    }
}

 const styles = {
    nameStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    descriptionStyle: {
        fontSize: 15
    }
};

const mapStateToProps = ({newChallenges}) => {
    const {challenges} = newChallenges;
    return {challenges};

};

export default connect(mapStateToProps)(AddChallengeList);
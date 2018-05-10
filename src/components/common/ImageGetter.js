import React, {Component} from 'react';
import {Button} from './Button';
import {CardSection} from './CardSection';
import {connect} from 'react-redux';
import {takePhoto, uploadPhoto}from '../../Actions';

class ImageGetter extends Component {

    //open camera roll
    async chooseImage() {
        let response = await uploadPhoto();
        if(response != null) {
            this.props.onAddImage(response);
        }
    }

    //open camera
    async takeImage() {
        let response = await takePhoto();
        if(response != null){
            this.props.onAddImage(response)
        }
    }

    render() {
        const {chooseImageContainer} = styles;

        return(
            <CardSection style={chooseImageContainer}>
                <Button
                    onPress={() => {this.chooseImage()}}
                    iconName={'photo'}
                    iconSize={35}

                />

                <Button
                    onPress={() => {this.takeImage()}}
                    iconName={'camera-alt'}
                    iconSize={35}
                />

            </CardSection>
        );
    }
}

const styles = {

    chooseImageContainer: {
        justifyContent: 'space-around',
        paddingBottom: 0
    }

};

const mapStateToProps = ({}) =>{
    return {};
};

export default connect(mapStateToProps, {takePhoto, uploadPhoto }) (ImageGetter);


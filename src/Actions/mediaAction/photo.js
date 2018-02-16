import { ImagePicker } from 'expo';

let quality = 0.3;

export async function takePhoto() {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: quality,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
        return null;
    }

    return result

}

export async function uploadPhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: quality,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (result.cancelled) {
        return null;
    }

    return result


}

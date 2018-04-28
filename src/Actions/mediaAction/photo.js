import { ImagePicker, Permissions } from 'expo';

let quality = 0.3;


//user can take a photo
export async function takePhoto() {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action

    //ask user for permision to use camera
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    //check if user granted you permission to use camera
    if (status !== 'granted'){
        return null;
    }

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

//user kan choose a photo from libary
export async function uploadPhoto() {

    //ask user for permision to use camera_roll
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //check if user granted you permission to use camera_roll
    if (status !== 'granted'){
        return null;
    }
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
//sends photo to server that will put it in storage
export async function uploadPhotoToServer(location, image) {

        //bruker * i steden for /, fordi ellers forsvinner pathen og jeg klarer ikke å fikse det...
        const body = new FormData();

        body.append("image", {
            uri: image.uri,
            name: location,
            type: 'image/jpg'
        });

        const res = await fetch("https://us-central1-challenges-840a4.cloudfunctions.net/upload_image_api/picture", {
            method: "POST",
            body,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        });


}

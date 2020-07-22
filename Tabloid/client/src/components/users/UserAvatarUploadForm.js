import React, { useState, useRef, useContext } from 'react';
import { Form, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap';
import { ImageContext } from '../../providers/ImageProvider';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { useHistory, useLocation } from 'react-router-dom'

const UserAvatarUploadForm = ({ user, toggle }) => {

    let location = useLocation();
    const history = useHistory();

    const { uploadAvatarImage, deleteAvatarImage } = useContext(ImageContext);
    const { updateUser } = useContext(UserProfileContext);

    const userProfile = user;
    const [oldImage, setOldImage] = useState(userProfile.imageLocation);

    const imageUrl = useRef()

    //handle the image upload preview area
    const [preview, setPreview] = useState(oldImage);

    const previewImage = e => {
        if (e.target.files.length) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const previewUrlImage = e => {
        if (e.target.value.length) {
            setPreview(e.target.value);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const file = document.querySelector('input[type="file"]').files[0];

        const User = {};
        let newImageName = ""

        //code for handling the image upload
        if (file !== undefined) {
            //get file extension
            const extension = file.name.split('.').pop();

            const allowedExstensions = [
                'png',
                'bmp',
                'gif',
                'jpg',
                'jpeg'
            ];

            if (!allowedExstensions.includes(extension)) {
                window.alert("Your file must be a .jpg, .gif, .png, or .bmp.");
                return;
            }

            newImageName = `${new Date().getTime()}.${extension}`;
            User.imageLocation = newImageName;
        } else if (file === undefined && imageUrl.current.value !== "") {
            User.imageLocation = imageUrl.current.value;
        } else {
            User.imageLocation = userProfile.imageLocation;
        }

        User.id = userProfile.id;
        User.firebaseUserId = userProfile.firebaseUserId;
        User.displayName = userProfile.displayName;
        User.firstName = userProfile.firstName;
        User.lastName = userProfile.lastName;
        User.email = userProfile.email;
        User.createDateTime = userProfile.createDateTime;
        User.userTypeId = userProfile.userTypeId;
        User.isApproved = userProfile.isApproved;

        updateUser(User)
            .then(() => {
                if (file !== undefined) {
                    const formData = new FormData();
                    formData.append('file', file, newImageName);

                    uploadAvatarImage(formData, newImageName);
                    setPreview(null);
                }
            })
            .then(() => { //delete old image
                const newImage = User.imageLocation;

                if (oldImage !== null && !oldImage.startsWith("http") && oldImage !== newImage) {

                    deleteAvatarImage(oldImage);
                }
            })
            .then(toggle)
            .then(() => {
                history.push({ pathname: "/empty" });
                history.replace({ pathname: location.pathname })
            })
    }

    return (
        <Form encType="multipart/form-data">
            <FormGroup>
                <div className="d-flex justify-content-between">
                    <Input type="file" name="file" id="imageUpload" onChange={e => previewImage(e)} onClick={() => imageUrl.current.value = ""} />
                    <Button type="button" color="light" onClick={e => { setPreview(null); document.querySelector('input[type="file"]').value = null; userProfile.imageLocation = null; }}>Clear</Button>
                </div>
                <InputGroup className="mt-2">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>OR</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' name='imageUrl' id='imageUrl' innerRef={imageUrl} defaultValue={userProfile.imageLocation !== null ? (userProfile.imageLocation.startsWith("http") ? userProfile.imageLocation : "") : ""} placeholder="http://myImageUrl" onChange={previewUrlImage} />
                </InputGroup>
            </FormGroup>
            <FormGroup className="text-center">
                {
                    preview === null
                        ?
                        <Alert color="light">No image selected</Alert>
                        :
                        <img src={preview[0] === "b" || preview.startsWith("http") ? preview : `/images/avatars/full/${preview}`} alt="image preview" className="img-thumbnail" />

                }
            </FormGroup>
            <FormGroup className='text-right'>
                <Button type="button" color="secondary" onClick={toggle} className="mx-2">Cancel</Button>
                <Button color="primary" type="submit" onClick={e => handleSubmit(e)}>Save</Button>
            </FormGroup>
        </Form>
    )

}

export default UserAvatarUploadForm;


import React, { useState, useRef } from 'react';
import { Form, FormGroup, Input, Label, Button, InputGroup, InputGroupAddon, InputGroupText, Alert } from 'reactstrap';

const UserAvatarUploadForm = ({ user }) => {

    const userProfile = user;
    const oldImage = userProfile.imageLocation;

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
                        <img src={preview[0] === "b" || preview.startsWith("http") ? preview : `/images/headers/${preview}`} alt="image preview" className="img-thumbnail" />

                }
            </FormGroup>
        </Form>
    )

}

export default UserAvatarUploadForm;


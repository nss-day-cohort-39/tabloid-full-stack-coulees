import { PostContext } from "../../providers/PostProvider";
import DatePicker from 'reactstrap-date-picker/lib/DatePicker';
import React, { useContext, useRef, useState, useEffect } from 'react'
import { Form, FormGroup, Input, Button, Label, Alert } from 'reactstrap'
import PostTagForm from './PostTagForm';
import { CategoryContext } from '../../providers/CategoryProvider';
import { ImageContext } from "../../providers/ImageProvider";

const AddPostForm = () => {
    const { addPost } = useContext(PostContext)
    const { categories, getAllCategory } = useContext(CategoryContext)
    const { uploadImage } = useContext(ImageContext)
    const [publishDate, set] = useState()
    const [categorySelect, setCategorySelection] = useState("");
    const [chosenTags, setChosenTags] = useState([]);

    const handleDateChange = (e) => {
        set(e.target.value)
    }

    const title = useRef()
    const content = useRef()

    useEffect(() => {
        getAllCategory()
    }, [])

    const handleCategorySelection = (e) => {
        setCategorySelection(e.target.value)
    }

    //handle the image upload preview area
    const [preview, setPreview] = useState(null);

    const previewImage = e => {
        if (e.target.files.length) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (event) => {
        const file = document.querySelector('input[type="file"]').files[0];

        const Post = {
            title: title.current.value,
            content: content.current.value,
            publishDateTime: publishDate,
            categoryId: +categorySelect,
            isApproved: true
        }
        if (!Post.title.length) {
            window.alert("Post must have a title.")
            return
        }
        if (!Post.content.length) {
            window.alert("Post must have content.")
            return
        }

        //code for handling the image upload
        if (file !== undefined) {
            console.log(file);
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
            } else {

                const newImageName = `${new Date().getTime()}.${extension}`;

                const formData = new FormData();
                formData.append('file', file, newImageName);

                uploadImage(formData, newImageName);

                Post.imageLocation = newImageName;
            }
        } else {
            Post.imageLocation = null;
        }

        addPost(Post, chosenTags);
    }
    return (
        <div className="d-flex justify-content-center">
            <div className="smallContainer border rounded p-4">
                <Form encType="multipart/form-data">
                    <h4>Create a new Post</h4>
                    <hr />
                    <FormGroup>
                        <Label for="title">Post Title</Label>
                        <Input type='text' name='Title' id='postTitle' innerRef={title}
                            placeholder='Something New and Amazing' className='form-control'></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageUpload">Header Image <small className="text-muted font-italic">(Optional)</small></Label>
                        <div className="d-flex justify-content-between">
                            <Input type="file" name="file" id="imageUpload" onChange={previewImage} />
                            <Button type="button" color="light" onClick={e => { setPreview(null); document.querySelector('input[type="file"]').value = null; }}>Clear</Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        {
                            preview === null
                                ?
                                <Alert color="light">No image selected</Alert>
                                :
                                <img src={preview} alt="image preview" className="img-thumbnail" />
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="Content">Post Content</Label>
                        <Input type='textarea' name='Content' id='postContent' innerRef={content}
                            placeholder='Add your content...' className='form-control' rows="10"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='PublishDate'>Publish Date</Label>
                        <Input type='date' name='PublishDate' id='publishDate' onChange={handleDateChange} />
                        <small className="text-muted font-italic">You can leave this blank to keep your post unpublished.</small>
                    </FormGroup>
                    <FormGroup>
                        <Label for='categoryId'>Category</Label>
                        <Input type="select" onChange={handleCategorySelection} id="categoryId">
                            <option value="">Please select...</option>
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <PostTagForm chosenTags={chosenTags} setChosenTags={setChosenTags} />
                    </FormGroup>
                    <div className='d-flex flex-row-reverse'>
                        <Button color="primary" size='mb-1' onClick={handleSubmit}>Save Post</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}


export default AddPostForm
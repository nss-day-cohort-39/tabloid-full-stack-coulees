import React, { useContext, useRef, useEffect, useState } from 'react'
import { Form, FormGroup, Input, Row, Button, Label, Spinner, Alert } from 'reactstrap'
import { PostContext } from "../../providers/PostProvider";
import DatePicker from 'reactstrap-date-picker/lib/DatePicker';
import { PostTagContext } from '../../providers/PostTagProvider';
import PostTagForm from './PostTagForm';
import { CategoryContext } from '../../providers/CategoryProvider';
import { ImageContext } from '../../providers/ImageProvider';
import { useHistory, useLocation } from 'react-router-dom'

//There are two ways to access this form:
//1) By the post list views; and 2) By the post details view
//The post details view passes in a showEdit function that toggles a modal. Otherwise, showEdit is ignored.
const EditPostForm = ({ showEdit, postId }) => {
    const [ready, set] = useState(false)
    const [publishDate, setPublishDate] = useState(null)
    const [post, setPost] = useState({})
    const [tagReady, tagSet] = useState(false)
    const { updatePost, getPost } = useContext(PostContext)
    const id = postId;
    const { postTags, getAllPostTags } = useContext(PostTagContext);
    const { categories, getAllCategory } = useContext(CategoryContext);
    const { uploadImage, deleteImage } = useContext(ImageContext)

    let location = useLocation();
    const history = useHistory();

    const [categorySelect, setCategorySelection] = useState("");

    const handleDateChange = (e) => {
        setPublishDate(e)
    }

    useEffect(() => {
        getPost(id)
            .then((post) => {
                setPost(post)
                return post
            })
            .then((post) => {
                setPublishDate(post.publishDateTime);
                if (post.imageLocation !== null && post.imageLocation !== "") {
                    setPreview(post.imageLocation);
                } else {
                    setPreview(null);
                }
            })
            .then(() => set(true))

        getAllCategory()
    }, [])
    const handleCategorySelection = (e) => {
        setCategorySelection(e.target.value)
    }

    useEffect(() => {
        getPost(id)
            .then(() => set(true))
    }, [])

    useEffect(() => {
        getAllPostTags(id)
            .then(() => tagSet(true))
    }, [])

    const title = useRef()
    const content = useRef()

    //handle the image upload preview area
    const [preview, setPreview] = useState(null);

    const previewImage = e => {
        if (e.target.files.length) {
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    //state to store the tag array
    const [chosenTags, setChosenTags] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        const file = document.querySelector('input[type="file"]').files[0];
        console.log(file);

        const Post = {};
        let newImageName = ""

        //code for handling the image upload
        if (file === undefined) {
            Post.imageLocation = post.imageLocation;
        } else {
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
            Post.imageLocation = newImageName;
        }

        Post.title = title.current.value;
        Post.content = content.current.value;
        Post.publishDateTime = publishDate;
        Post.categoryId = (categorySelect !== "" ? +categorySelect : post.categoryId);

        if (categorySelect === "") {
            Post.categoryId = post.categoryId;
        }
        if (!Post.title.length) {
            window.alert("Post must have a title.")
            return
        }
        if (!Post.content.length) {
            window.alert("Post must have content.")
            return
        }
        //add back all of the values that the user is not allowed to change
        Post.id = post.id
        Post.createDateTime = post.createDateTime
        Post.userProfileId = post.userProfileId
        Post.isApproved = post.isApproved

        console.log(Post)

        updatePost(Post, chosenTags)
            .then(() => {
                if (file !== undefined) {
                    const formData = new FormData();
                    formData.append('file', file, newImageName);

                    uploadImage(formData, newImageName)
                        .then(deleteImage(post.imageLocation)); //delete old image

                    setPreview(null);
                }
            })
            .then(() => {
                history.push({ pathname: "/empty" });
                history.replace({ pathname: location.pathname })
            })
        if (showEdit) {
            showEdit(false)
        }
    }

    //setting default value for date
    if (ready === true && tagReady === true) {
        return (
            <div className="container">
                <Form encType="multipart/form-data">
                    <FormGroup>
                        <Label for="title">Post Title</Label>
                        <Input type='text' name='Title' id='postTitle' innerRef={title} defaultValue={post ? post.title : ''}
                            placeholder='Title' className='form-control'></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageUpload">Header Image <small className="text-muted font-italic">(Optional)</small></Label>
                        <div className="d-flex justify-content-between">
                            <Input type="file" name="file" id="imageUpload" onChange={e => previewImage(e)} />
                            <Button type="button" color="light" onClick={e => { setPreview(null); document.querySelector('input[type="file"]').value = null; post.imageLocation = null; }}>Clear</Button>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        {
                            preview === null
                                ?
                                <Alert color="light">No image selected</Alert>
                                :
                                <img src={preview[0] === "b" || preview.startsWith("http") ? preview : `/images/headers/${preview}`} alt="image preview" className="img-thumbnail" />

                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="Content">Post Content</Label>
                        <Input type='textarea' name='Content' id='postContent' innerRef={content} defaultValue={post ? post.content : ''}
                            placeholder='Add your content...' className='form-control' rows="7"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='PublishDate'>Publish Date</Label>
                        <DatePicker value={publishDate} onChange={handleDateChange} />
                        <small className="text-muted font-italic">You can leave this blank to keep your post unpublished.</small>
                    </FormGroup>
                    <FormGroup>
                        <Label for='categoryId'>Category</Label>
                        <Input type="select" onChange={handleCategorySelection} id="categoryId" defaultValue={post.categoryId}>
                            <option value="">Please select...</option>
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <PostTagForm postTags={postTags.map(pt => pt.tag)} chosenTags={chosenTags} setChosenTags={setChosenTags} />
                    </FormGroup>
                    <div className='text-right'>
                        <Button type="button" color="secondary" onClick={() => showEdit(false)} className="mx-2">Cancel</Button>
                        <Button color="primary" type="submit" onClick={e => handleSubmit(e)}>Save</Button>
                    </div>
                </Form>
            </div >
        )
    }
    else return <Spinner />

}

export default EditPostForm
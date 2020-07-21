import React, { useContext, useRef, useEffect, useState } from 'react'
import { Form, FormGroup, Input, Row, Button, Label, Spinner } from 'reactstrap'
import { PostContext } from "../../providers/PostProvider";
import DatePicker from 'reactstrap-date-picker/lib/DatePicker';
import { PostTagContext } from '../../providers/PostTagProvider';
import PostTagForm from './PostTagForm';
import { CategoryContext } from '../../providers/CategoryProvider';

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

    const [categorySelect, setCategorySelection] = useState("");

    const handleDateChange = (e) => {
        console.log(e)
        setPublishDate(e)
    }

    useEffect(() => {
        getPost(id)
            .then((post) => {
                setPost(post)
                return post
            })
            .then((post) => setPublishDate(post.publishDateTime))
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
    const imageUrl = useRef()
    const content = useRef()

    //state to store the tag array
    const [chosenTags, setChosenTags] = useState([]);

    const handleSubmit = () => {
        const Post = {

            title: title.current.value,
            imageLocation: imageUrl.current.value,
            content: content.current.value,
            publishDateTime: publishDate,
            publishDateTime: publishDate,
            categoryId: (categorySelect !== "" ? +categorySelect : post.categoryId)
        }
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
        updatePost(Post, chosenTags)
        if (showEdit) {
            showEdit(false)
        }
    }

    //setting default value for date
    if (ready === true && tagReady === true) {
        return (
            <div className="container">
                <Form>
                    <FormGroup>
                        <Label for="title">Post Title</Label>
                        <Input type='text' name='Title' id='postTitle' innerRef={title} defaultValue={post ? post.title : ''}
                            placeholder='Title' className='form-control'></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="ImageUrl">Post Image URL <small class="text-muted font-italic">(Optional)</small></Label>
                        <Input type='text' name='ImageUrl' id='postImageUrl' innerRef={imageUrl} defaultValue={post ? post.imageLocation : ''}
                            placeholder='Image URL' className='form-control'></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Content">Post Content</Label>
                        <Input type='textarea' name='Content' id='postContent' innerRef={content} defaultValue={post ? post.content : ''}
                            placeholder='Add your content...' className='form-control' rows="7"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='PublishDate'>Publish Date</Label>
                        <DatePicker value={publishDate} onChange={handleDateChange} />
                        <small class="text-muted font-italic">You can leave this blank to keep your post unpublished.</small>
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
                        <Button color="primary" onClick={handleSubmit}>Save</Button>
                    </div>
                </Form>
            </div >
        )
    }
    else return <Spinner />

}

export default EditPostForm
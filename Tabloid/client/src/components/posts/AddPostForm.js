import { PostContext } from "../../providers/PostProvider";
import DatePicker from 'reactstrap-date-picker/lib/DatePicker';
import React, { useContext, useRef, useState, useEffect } from 'react'
import { Form, FormGroup, Input, Row, FormText, Button, Label, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap'
import PostTagForm from './PostTagForm';
import { CategoryContext } from '../../providers/CategoryProvider';

const AddPostForm = () => {
    const { addPost } = useContext(PostContext)
    const { categories, getAllCategory } = useContext(CategoryContext)
    const [publishDate, set] = useState()
    const [categorySelect, setCategorySelection] = useState("");
    const [chosenTags, setChosenTags] = useState([]);

    const handleDateChange = (e) => {
        set(e.target.value)
    }

    const title = useRef()
    const imageUrl = useRef()
    const content = useRef()

    useEffect(() => {
        getAllCategory()
    }, [])

    const handleCategorySelection = (e) => {
        setCategorySelection(e.target.value)
    }
    const handleSubmit = () => {
        const Post = {
            title: title.current.value,
            imageLocation: imageUrl.current.value,
            content: content.current.value,
            publishDateTime: publishDate,
            categoryId: +categorySelect,
            isApproved: true
        }
        if (categorySelect === "") {
            window.alert("You must choose category id")
            return
        }
        if (!Post.title.length) {
            window.alert("Post must have a title.")
            return
        }
        if (!Post.content.length) {
            window.alert("Post must have content.")
            return
        }
        addPost(Post, chosenTags)
    }
    return (
        <>
            <div className="container border pl-5 pr-5 mt-2 pb-1">
                <Form>
                    <FormText className='h4 text-center'>Create a new Post</FormText>
                    <Row>
                        <FormGroup className='row col mr-1'>
                            <Input type='text' name='Title' id='postTitle' innerRef={title}
                                placeholder='Title' className='form-control form-control-sm'></Input>
                        </FormGroup>
                        <FormGroup className='row col'>
                            <Input type='text' name='ImageUrl' id='postImageUrl' innerRef={imageUrl}
                                placeholder='Image URL' className='form-control form-control-sm'></Input>
                        </FormGroup>
                    </Row>
                    <FormGroup className='row'>
                        <Input type='textarea' name='Content' id='postContent' innerRef={content}
                            placeholder='Add your content...' className='form-control form-control-sm' rows="10"></Input>
                    </FormGroup>
                    <FormGroup className='text-center'>
                        <Label for='PublishDate'>Choose a Date to Publish Your Post</Label>
                        <Input type='date' name='PublishDate' id='publishDate' onChange={handleDateChange} />
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
                        <Button size='sm mb-1' onClick={handleSubmit}>Save</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}


export default AddPostForm
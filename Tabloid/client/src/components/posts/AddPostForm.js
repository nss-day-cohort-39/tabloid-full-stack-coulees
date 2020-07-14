import React, { useContext, useRef, useState } from 'react'
import { Form, FormGroup, Input, Row, FormText, Button, Label, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { PostContext } from "../../providers/PostProvider";
import PostTagForm from './PostTagForm';

const AddPostForm = () => {
    const { addPost } = useContext(PostContext)

    const title = useRef()
    const imageUrl = useRef()
    const content = useRef()
    const publishDate = useRef()

    //state to store the tag array
    const [chosenTags, setChosenTags] = useState([]);

    const handleSubmit = () => {
        const Post = {
            title: title.current.value,
            imageLocation: imageUrl.current.value,
            content: content.current.value,
            publishDateTime: (publishDate.current.value) ? publishDate.current.value : null,
            categoryId: 1, //THIS NEEDS TO BE CHANGED ONCE THE CATEGORY REPO/PROVIDER IS CREATED
            isApproved: true,
            tags: chosenTags
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
                            placeholder='Add your content...' className='form-control form-control-sm'></Input>
                    </FormGroup>
                    <FormGroup className='text-center'>
                        <Label for='PublishDate'>Choose a Date to Publish Your Post</Label>
                        <Input type='date' name='PublishDate' id='publishDate' innerRef={publishDate} />
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
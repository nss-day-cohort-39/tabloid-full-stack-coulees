import React, { useContext, useRef } from 'react'
import { Form, FormGroup, Input, Row, FormText, Button, Label } from 'reactstrap'
import { PostContext } from "../../providers/PostProvider";
import { useHistory } from "react-router-dom"

const PostForm = () => {
    const history = useHistory();
    const { addPost } = useContext(PostContext)

    const title = useRef()
    const imageUrl = useRef()
    const content = useRef()
    const publishDate = useRef()

    const handleSubmit = () => {
        const Post = {
            title: title.current.value,
            imageLocation: imageUrl.current.value,
            content: content.current.value,
            publishDateTime: publishDate.current.value,
            categoryId: 1 //THIS NEEDS TO BE CHANGED ONCE THE CATEGORY REPO/PROVIDER IS CREATED
        }
        console.log(Post)
        addPost(Post)
        history.push('/myposts')
    }

    return (
        <div className="container border pl-5 pr-5 mt-2 pb-1">
            <Form>
                <FormText className='h4 text-center'>Create a New Post</FormText>
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
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default PostForm
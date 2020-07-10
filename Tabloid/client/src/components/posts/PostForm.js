import React, { useContext, useRef } from 'react'
import { Form, FormGroup, Input, Row, FormText, Button, Label } from 'reactstrap'
import { PostContext } from "../../providers/PostProvider";

const PostForm = ({ post, showEdit }) => {
    const { addPost, updatePost } = useContext(PostContext)

    const title = useRef()
    const imageUrl = useRef()
    const content = useRef()
    const publishDate = useRef()

    const handleSubmit = () => {
        const Post = {

            title: title.current.value,
            imageLocation: imageUrl.current.value,
            content: content.current.value,
            publishDateTime: (publishDate.current.value) ? publishDate.current.value : null,
            categoryId: 1 //THIS NEEDS TO BE CHANGED ONCE THE CATEGORY REPO/PROVIDER IS CREATED
        }
        if (post) {
            Post.id = post.id
            Post.createDateTime = post.createDateTime
            Post.userProfileId = post.userProfileId
            Post.categoryId = post.categoryId
            Post.isApproved = post.isApproved
            updatePost(Post)
            showEdit(false)
        }
        else {
            addPost(Post)
        }
    }

    return (
        <div className="container border pl-5 pr-5 mt-2 pb-1">
            <Form>
                <FormText className='h4 text-center'>{post ? "Edit Post" : "Create a new Post"}</FormText>
                <Row>
                    <FormGroup className='row col mr-1'>
                        <Input type='text' name='Title' id='postTitle' innerRef={title} defaultValue={post ? post.title : ''}
                            placeholder='Title' className='form-control form-control-sm'></Input>
                    </FormGroup>
                    <FormGroup className='row col'>
                        <Input type='text' name='ImageUrl' id='postImageUrl' innerRef={imageUrl} defaultValue={post ? post.imageLocation : ''}
                            placeholder='Image URL' className='form-control form-control-sm'></Input>
                    </FormGroup>
                </Row>
                <FormGroup className='row'>
                    <Input type='textarea' name='Content' id='postContent' innerRef={content} defaultValue={post ? post.content : ''}
                        placeholder='Add your content...' className='form-control form-control-sm'></Input>
                </FormGroup>
                <FormGroup className='text-center'>
                    <Label for='PublishDate'>Choose a Date to Publish Your Post</Label>
                    <Input type='date' name='PublishDate' id='publishDate' innerRef={publishDate} defaultValue={post ? post.publishDateTime : ''} />
                </FormGroup>
                <div className='d-flex flex-row-reverse'>
                    <Button size='sm mb-1' onClick={handleSubmit}>Save</Button>
                </div>
            </Form>
        </div>
    )
}

export default PostForm
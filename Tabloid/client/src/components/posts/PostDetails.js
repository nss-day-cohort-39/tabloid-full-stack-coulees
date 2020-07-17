import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { PostContext } from '../../providers/PostProvider';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Badge } from 'reactstrap';
import EditPostForm from './EditPostForm';
import { PostTagContext } from '../../providers/PostTagProvider';
import CommentList from '../comment/CommentList';

const PostDetails = () => {
    const [deleteModal, showDelete] = useState(false)
    const [editModal, showEdit] = useState(false)
    const { post, getPost, deletePost } = useContext(PostContext);
    const { id } = useParams();
    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id

    const { postTags, getAllPostTags } = useContext(PostTagContext);

    useEffect(() => {
        getPost(id);
        getAllPostTags(id);
    }, []);

    const history = useHistory();

    if (!post) {
        return null;
    }

    const confirmDelete = () => {
        showDelete(false)
        deletePost(post.id)
    }

    const renderButtons = (post, currentUserId) => {

        if (post.userProfileId === currentUserId) {
            return (
                <>
                    <Button onClick={() => showEdit(true)}>Edit</Button>
                    <Button className='btn btn-danger ml-2' onClick={() => showDelete(true)}>Delete</Button>
                </>
            )
        }
    }

    const renderModals = (post, currentUserId) => {
        if (post.userProfileId === currentUserId) {
            return (
                <>
                    <Modal isOpen={deleteModal} >
                        <ModalHeader>Are you sure you want to delete this post?</ModalHeader>
                        <ModalFooter>
                            <Button className='btn btn-danger' onClick={confirmDelete}>Delete</Button>
                            <Button onClick={() => showDelete(false)}>Cancel</Button>
                        </ModalFooter>
                    </Modal >
                    <Modal isOpen={editModal}>
                        <ModalBody>
                            <EditPostForm postId={post.id} showEdit={showEdit} />
                            <Button className='btn mt-1' size='small' outline={true} onClick={() => showEdit(false)}>cancel</Button>
                        </ModalBody>
                    </Modal>
                </>
            )
        }
    }

    let dateTimeFormat
    if (post.publishDateTime) {
        const date = new Date(post.publishDateTime);
        dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
    }


    return (
        <>
            <div className="container">
                <h2>{post.title}</h2>
                <h3>{post.userProfile.displayName}</h3>
                <h3>{dateTimeFormat ? dateTimeFormat : ''}</h3>
                <h3>{post.category.name}</h3>
                {
                    postTags.length > 0
                        ?
                        <h5>
                            {postTags.map(tag => {
                                return (<Badge key={"tag-" + tag.id} color="info" className="mr-2 mb-2 px-2">{tag.tag.name}</Badge>)
                            })}
                        </h5>
                        :
                        ""
                }
                <hr />
                <img src={post.imageLocation} alt={post.title} className="largeImage" />
                <p className="content">{post.content}</p>
                {renderButtons(post, currentUserId)}
            </div >
            {renderModals(post, currentUserId)}
            {/* <Button color="secondary" onClick={() => {
                history.push(`/CommentList/${id}`)
            }}>View Comments</Button> */}
            <CommentList />
        </>
    );
};


export default PostDetails;
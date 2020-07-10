import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { PostContext } from '../../providers/PostProvider';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import EditPostForm from './EditPostForm';

const PostDetails = () => {
    const [deleteModal, showDelete] = useState(false)
    const [editModal, showEdit] = useState(false)
    const { post, getPost, deletePost } = useContext(PostContext);
    const { id } = useParams();
    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id

    useEffect(() => {
        getPost(id);
    }, []);

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

    const date = new Date(post.publishDateTime);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);

    return (
        <>
            <div className="container">
                <h2>{post.title}</h2>
                <h3>{post.userProfile.displayName}</h3>
                <h3>{dateTimeFormat}</h3>
                <h3>{post.category.name}</h3>
                <hr />
                <img src={post.imageLocation} alt={post.title} className="img-fluid" />
                <p>{post.content}</p>
                {renderButtons(post, currentUserId)}
            </div >
            {renderModals(post, currentUserId)}
        </>
    );
};

export default PostDetails;
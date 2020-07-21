import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { PostContext } from '../../providers/PostProvider';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Badge } from 'reactstrap';
import EditPostForm from './EditPostForm';
import { PostTagContext } from '../../providers/PostTagProvider';
import CommentList from '../comment/CommentList';

const PostDetails = () => {
    const [deleteModal, showDelete] = useState(false)
    const [editModal, showEdit] = useState(false)
    const editModalToggle = () => showEdit(!editModal)
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
                    <hr />
                    <h5>
                        Author Options
                        <Badge href="#" color="info" className="ml-2 p-2" onClick={() => showEdit(true)} size="sm">Edit Post</Badge>
                        <Badge href="#" color="danger" className="ml-2 p-2" onClick={() => showDelete(true)} size="sm">Delete</Badge>
                    </h5>
                </>
            )
        }
    }

    const renderModals = (post, currentUserId) => {
        if (post.userProfileId === currentUserId) {
            return (
                <>
                    <Modal isOpen={deleteModal} >
                        <ModalHeader>Delete a Post</ModalHeader>
                        <ModalBody class="lead">
                            <div className="lead mb-2">Are you sure you want to delete the post "{post.title}"?</div>
                            <div className="text-right">
                                <Button onClick={() => showDelete(false)}>Cancel</Button>
                                <Button className="btn btn-danger ml-2" onClick={confirmDelete}>Delete</Button>
                            </div>
                        </ModalBody>
                    </Modal >
                    <Modal isOpen={editModal} scrollable={true} toggle={editModalToggle}>
                        <ModalHeader toggle={editModalToggle}>
                            Edit Post
                    </ModalHeader>
                        <ModalBody>
                            <EditPostForm postId={post.id} showEdit={showEdit} />
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
                <h2 className="d-flex justify-content-between">
                    {post.title}
                    {
                        post.categoryId !== 0
                            ?
                            <h4><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{post.category?.name}</Badge></h4>
                            :
                            ""
                    }
                    {

                        post.categoryId === 0 && currentUserId === post.userProfileId
                            ?
                            <h4><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{post.category?.name}</Badge></h4>
                            :
                            ""
                    }
                </h2>
                <h4 className="font-weight-normal">by <Link to={`/users/${post.userProfile?.firebaseUserId}`}>{post.userProfile?.fullName}</Link></h4>
                <h4 className="font-weight-normal">Posted {dateTimeFormat ? dateTimeFormat : ''}</h4>
                {
                    postTags.length > 0
                        ?
                        <h5 className="mt-3">
                            {postTags.map(tag => {
                                return (<Badge key={"tag-" + tag.id} className="mr-2 mb-2 px-2 badge-outlined badge-info">{tag.tag.name}</Badge>)
                            })}
                        </h5>
                        :
                        ""
                }
                {renderButtons(post, currentUserId)}
                {
                    post.imageLocation === ""
                        ?
                        ""
                        :
                        <>
                            <hr />
                            <img src={post.imageLocation} alt={post.title} className="largeImage" />
                        </>

                }

                <hr />
                <p className="content article">{post.content}</p>
                <hr className="mt-4" />
                <CommentList />
            </div >
            {renderModals(post, currentUserId)}
            {/* <Button color="secondary" onClick={() => {
                history.push(`/CommentList/${id}`)
            }}>View Comments</Button> */}

        </>
    );
};


export default PostDetails;
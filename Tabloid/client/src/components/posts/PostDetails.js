import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { PostContext } from '../../providers/PostProvider';
import { Button, Modal, ModalHeader, ModalBody, Badge, Spinner } from 'reactstrap';
import EditPostForm from './EditPostForm';
import { PostTagContext } from '../../providers/PostTagProvider';
import CommentList from '../comment/CommentList';
import { SubscriptionContext } from '../../providers/SubscriptionProvider';

const PostDetails = () => {
    const [deleteModal, showDelete] = useState(false)
    const [editModal, showEdit] = useState(false)
    const [subscribed, setSubcribed] = useState(false)
    const [ready, setReady] = useState(false)
    const editModalToggle = () => showEdit(!editModal)
    const { getPost, deletePost } = useContext(PostContext);
    const { addSubscription, checkSubscription } = useContext(SubscriptionContext)
    const { id } = useParams();
    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
    const { getAllPostTags } = useContext(PostTagContext);
    const [post, setPost] = useState({})
    const [postTags, setTags] = useState([])

    useEffect(() => {
        setReady(false)
        getPost(id)
            .then((post) => {
                setPost(post)
                return post
            })
            .then((post) => checkSubscription(post.id))
            .then((resp) => setSubcribed(resp.isSubscribed))
            .then(() => getAllPostTags(id))
            .then(setTags)
            .then(() => setReady(true))
    }, []);

    useEffect(() => {

    }, [post])

    if (!post) {
        return null;
    }

    const confirmDelete = () => {
        showDelete(false)
        deletePost(post.id)
    }

    const renderSubscribedButton = () => {
        if (subscribed) {
            return (
                <>
                    <hr />
                    <h5>
                        <Badge color='info' size='sm' className='ml-2 badge-outlined'>Subscribed</Badge>
                    </h5>
                </>
            )
        }
        else {
            return (
                <>
                    <hr />
                    <h5>
                        Subscribe to Author
                        <Button color='info' size='sm' className='ml-2' onClick={() => handleSubscription(post, currentUserId)}>Subscribe</Button>
                    </h5>
                </>
            )
        }
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
        else {
            return renderSubscribedButton()
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

    const handleSubscription = (post, currentUserId) => {
        const sub = {
            subscriberUserProfileId: currentUserId,
            providerUserProfileId: post.userProfileId
        }

        addSubscription(sub)
    }

    let dateTimeFormat
    if (post.publishDateTime) {
        const date = new Date(post.publishDateTime);
        dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
    }

    if (ready) {
        return (
            <>
                <div className="container">
                    <h2 className="d-flex justify-content-between">
                        {post.title}
                        {
                            post.categoryId !== 0
                                ?
                                <Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{post.category.name}</Badge>
                                :
                                ""
                        }
                        {

                            post.categoryId === 0 && currentUserId === post.userProfileId
                                ?
                                <h4><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{post.category.name}</Badge></h4>
                                :
                                ""
                        }
                    </h2>
                    <h4 className="font-weight-normal">by <Link to={`/users/${post.userProfile.firebaseUserId}`}>{post.userProfile.fullName}</Link></h4>
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
            </>
        );
    }
    else {
        return <Spinner />
    }

};


export default PostDetails;
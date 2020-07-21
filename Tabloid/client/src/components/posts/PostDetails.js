import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Link, useParams } from "react-router-dom";
import { PostContext } from '../../providers/PostProvider';
import { Button, Modal, ModalHeader, ModalBody, Badge, Spinner } from 'reactstrap';
import EditPostForm from './EditPostForm';
import { PostTagContext } from '../../providers/PostTagProvider';
import CommentList from '../comment/CommentList';
import { SubscriptionContext } from '../../providers/SubscriptionProvider';

const PostDetails = () => {
    //State Variables And Context
    const { id } = useParams();
    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
    const { getPost, deletePost } = useContext(PostContext);
    const { addSubscription, checkSubscription, unsubscribe, getSubByPost } = useContext(SubscriptionContext)
    const { getAllPostTags } = useContext(PostTagContext);
    const [deleteModal, showDelete] = useState(false)
    const [editModal, showEdit] = useState(false)
    const [subscribed, setSubcribed] = useState(false)
    const [post, setPost] = useState({})
    const [postTags, setTags] = useState([])
    const [subscription, setSub] = useState([])
    const [ready, setReady] = useState(false)

    useEffect(() => {
        //On render:
        //1. Reset loader
        setReady(false)
        //2. Get the post for the Details Page
        getPost(id)
            .then((post) => {
                //3. Check to see if the user is subscribed to this author
                checkSubscription(post.id)
                    .then((resp) => {
                        //4. Set the local state variable "subscribed" to the response of the check (true/false)
                        setSubcribed(resp.isSubscribed)
                        return resp.isSubscribed
                    })
                    .then((resp) => {
                        //5. If the response to the subscription check is true, get and store the subscription
                        if (resp) {
                            getSubByPost(post.id)
                                .then(setSub)
                        }
                    })
                //6. Store the post for the details page in the local state variable
                setPost(post)
                return post
            })
            //7. Get the Post Tags
            .then(() => getAllPostTags(id))
            //8. Store the Post Tags
            .then(setTags)
            //9. Turn off the spinner and display the content
            .then(() => setReady(true))
    }, []);

    if (!post) {
        return null;
    }

    //Event Handler Functions
    const confirmDelete = () => {
        showDelete(false)
        deletePost(post.id)
    }
    const handleUnsubscribe = () => {
        unsubscribe(subscription.id)
            .then(() => setSubcribed(false))
    }
    const handleSubscription = (post, currentUserId) => {
        const sub = {
            subscriberUserProfileId: currentUserId,
            providerUserProfileId: post.userProfileId
        }

        addSubscription(sub)
    }
    const editModalToggle = () => showEdit(!editModal)

    //Render Functions
    const renderSubscribedButton = () => {
        if (subscribed) {
            return (
                <>
                    <hr />
                    <h5>
                        <Button color='info' size='sm' outline className='ml-2' onClick={handleUnsubscribe}>Unsubscribe</Button>
                    </h5>
                </>
            )
        }
        else {
            return (
                <>
                    <hr />
                    <h5>
                        Subscribe to Author:
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
                        <ModalBody className="lead">
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

    //Date Formatter
    let dateTimeFormat
    if (post.publishDateTime) {
        const date = new Date(post.publishDateTime);
        dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
    }

    //Component Return Statements
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
                </div>
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
                    post.imageLocation === "" || post.imageLocation === null
                        ?
                        ""
                        :
                        <>
                            <hr />
                            <img src={post.imageLocation[0] === "h" ? post.imageLocation : `/images/headers/${post.imageLocation}`} alt={post.title} className="largeImage" />
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
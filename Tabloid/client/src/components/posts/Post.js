import React, { useContext, useEffect, useState } from "react"
import { Card, CardImg, CardBody, CardFooter, Button, Badge, Modal, ModalHeader, ModalBody } from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import { PostContext } from "../../providers/PostProvider";
import { PostTagContext } from '../../providers/PostTagProvider';
import EditPostForm from "./EditPostForm";


const Post = ({ post }) => {

    const history = useHistory()

    const [editModal, showEdit] = useState(false);
    const editModalToggle = () => showEdit(!editModal)

    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id

    const checkCurrentUser = (post, currentUser) => {

        if (post.userProfileId === currentUser) {
            return (
                <div className="upperRight p-2"><div>
                    <Button onClick={editModalToggle} color="info" size="sm">Edit</Button>
                </div></div>
            )
        }
    }

    return (
        <>
            <Card className="m-2" id={`post-${post.id}`}>
                {
                    post.imageLocation === "" || post.imageLocation === null
                        ?
                        <CardImg top />
                        :
                        <CardImg top src={post.imageLocation[0] === "h" ? post.imageLocation : `/images/headers/${post.imageLocation}`} alt={post.title} />
                }
                <CardBody>
                    <div className="d-flex justify-content-between">
                        <h4 className="text-left px-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h4>
                        {
                            post.categoryId !== 0
                                ?
                                <h6><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{post.category?.name}</Badge></h6>
                                :
                                ""
                        }
                        {

                            post.categoryId === 0 && currentUserId === post.userProfileId
                                ?
                                <h6><Badge className="text-left ml-1 p-2 badge-secondary badge-outlined">{post.category?.name}</Badge></h6>
                                :
                                ""
                        }
                    </div>
                    <div className="text-left px-2 lead">by <Link to={`/users/${post.userProfile?.firebaseUserId}`}>{post.userProfile?.fullName}</Link></div>

                </CardBody>
                {checkCurrentUser(post, currentUserId)}
            </Card>
            {
                post.userProfileId === currentUserId
                    ?
                    (<Modal isOpen={editModal} toggle={editModalToggle} scrollable={true}>
                        <ModalHeader toggle={editModalToggle}>
                            Edit Post
                    </ModalHeader>
                        <ModalBody>
                            <EditPostForm postId={post.id} showEdit={showEdit} />
                        </ModalBody>
                    </Modal>)
                    :
                    ""
            }
        </>
    );
};

export default Post;
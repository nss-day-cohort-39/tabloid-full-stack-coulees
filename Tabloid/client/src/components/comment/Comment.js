
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import { Link } from "react-router-dom"
import CommentEditModal from './CommentEditModal'
import CommentDeleteModal from './CommentDeleteModal'

const Comment = ({ comment }) => {

    const currentUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
    const [editModal, setEditModal] = useState(false)
    const editModalToggle = () => setEditModal(!editModal)
    const [deleteModal, setDeleteModal] = useState(false)
    const deleteModalToggle = () => setDeleteModal(!deleteModal)

    const date = new Date(comment.createDateTime);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);


    return (
        <>
            <h4 className="d-flex justify-content-between">
                {comment.subject}
                {comment.userProfileId === currentUserId ? (
                    <div>
                        <Button color="info" size="sm" className="ml-2" outline onClick={() => { editModalToggle() }}>Edit</Button>
                        <Button color="danger" size="sm" className="ml-2" outline onClick={() => { deleteModalToggle() }}>Delete</Button>
                    </div>
                ) : ""}
            </h4>
            <div className="content">{comment.content}</div>
            <hr className="dotted" />
            <div class="font-italic">Posted by <Link>{comment.userProfile.displayName}</Link> on {dateTimeFormat}</div>

            {
                (comment.userProfileId === currentUserId) ? (
                    <>
                        <Modal isOpen={editModal} toggle={editModalToggle}>
                            <ModalHeader toggle={editModalToggle}>
                                Edit Comment
                </ModalHeader>
                            <ModalBody>
                                <CommentEditModal toggle={editModalToggle} comment={comment} />
                            </ModalBody>
                        </Modal>

                        <Modal isOpen={deleteModal} toggle={deleteModalToggle}>
                            <ModalHeader toggle={deleteModalToggle}>
                                Delete Comment
                </ModalHeader>
                            <ModalBody>
                                <CommentDeleteModal toggle={deleteModalToggle} comment={comment} />
                            </ModalBody>
                        </Modal>
                    </>) : (<></>)

            }


        </>

    );
};

export default Comment;




import React, { useContext, useState } from "react";
import { ListGroup, Button, Modal, ModalBody, ModalHeader } from "reactstrap"
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
        <ListGroup>
            <div className="text-left px-2">Posted by {comment.userProfile.displayName} on {dateTimeFormat}</div>
            <div className="text-left px-2"><strong>Subject:</strong>  {comment.subject}</div>
            <div className="text-left px-2"><strong>Content:</strong> {comment.content}</div>

            {


                (comment.userProfileId === currentUserId) ? (<>
                    <Button color="info" className="ml-2" onClick={() => { editModalToggle() }}>Edit</Button>

                    <Button color="danger" className="ml-2" onClick={() => { deleteModalToggle() }}>Delete</Button>
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


        </ListGroup>

    );
};

export default Comment;



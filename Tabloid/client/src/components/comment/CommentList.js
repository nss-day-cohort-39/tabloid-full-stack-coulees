import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button, ModalBody, Modal, ModalHeader, ListGroup, ListGroupItem } from "reactstrap"
import CommentEditModal from "./CommentEditModal";
import CommentForm from "./CommentForm"
import CommentDeleteModal from "./CommentDeleteModal";
import { useParams } from "react-router-dom";
import Comment from "./Comment"

const CommentList = () => {
    const { comments, getCommentByPostId, deleteComment, editComment } = useContext(CommentContext);



    const [addModal, setAddModal] = useState(false)
    const addModalToggle = () => setAddModal(!addModal)


    const [editModal, setEditModal] = useState(false)
    const editModalToggle = () => setEditModal(!editModal)


    const [deleteModal, setDeleteModal] = useState(false)
    const deleteModalToggle = () => setDeleteModal(!deleteModal)


    const [currentComment, setComments] = useState(null)

    const { id } = useParams();


    useEffect(() => {
        getCommentByPostId(id)
    }, []);

    return (
        <>
            <div className="container flex">
                <div className="row justify-content-center">
                    <div id="commentList" className="cards-column">
                        <Button color="secondary" onClick={addModalToggle} className="mb-4">Add Comment</Button>
                        <ListGroup>
                            {
                                (comments.length)
                                    ? comments.map((comment) => (
                                        <ListGroupItem key={comment.id} className="d-flex justify-content-between">

                                            <Comment comment={comment} />
                                            <div className="d-flex justify-content-end">

                                                <Button color="info" className="ml-2" onClick={() => { setComments(comments); editModalToggle(); }}>Edit</Button>
                                                <Button color="danger" className="ml-2" onClick={() => { deleteComment(comment.id).then(getCommentByPostId(id)); }}>Delete</Button>

                                            </div>
                                        </ListGroupItem>
                                    ))
                                    : <div className="alert alert-secondary mt-1" role="alert">There were no comments found.</div>
                            }
                        </ListGroup>
                    </div>
                </div>
            </div>

            <Modal isOpen={addModal} toggle={addModalToggle}>
                <ModalHeader toggle={addModalToggle}>
                    Add Comment
                </ModalHeader>
                <ModalBody>
                    <CommentForm toggle={addModalToggle} />
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggle={editModalToggle}>
                <ModalHeader toggle={editModalToggle}>
                    Edit Comment
                </ModalHeader>
                <ModalBody>
                    <CommentEditModal toggle={editModalToggle} comment={comments} />
                </ModalBody>
            </Modal>

            <Modal isOpen={deleteModal} toggle={deleteModalToggle}>
                <ModalHeader toggle={deleteModalToggle}>
                    Delete Comment
                </ModalHeader>
                <ModalBody>
                    <CommentDeleteModal toggle={deleteModalToggle} comment={comments} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default CommentList;
import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { Button, ModalBody, Modal, ModalHeader, ListGroup, ListGroupItem } from "reactstrap"
import CommentForm from "./CommentForm"
import { useParams, Link } from "react-router-dom";
import Comment from "./Comment"
import { PostContext } from "../../providers/PostProvider";

const CommentList = () => {
    const { comments, getCommentByPostId } = useContext(CommentContext);
    const { post, getPost } = useContext(PostContext);

    const [addModal, setAddModal] = useState(false)
    const addModalToggle = () => setAddModal(!addModal)

    const { id } = useParams();

    useEffect(() => {
        getCommentByPostId(id)
        getPost(id)
    }, []);

    return (
        <>
            <div className="container flex">
                <div className="row justify-content-center">
                    <div id="commentList" className="cards-column">
                        <Button color="secondary" onClick={addModalToggle} className="mb-4">Add Comment</Button>
                        {post ? (<h3>Comments for {post.title}</h3>) : (<h3>Comments for post</h3>)}
                        <ListGroup>
                            {
                                (comments.length)
                                    ? comments.map((comment) => (
                                        <ListGroupItem key={comment.id} className="d-flex justify-content-between">

                                            <Comment comment={comment} />
                                            <div className="d-flex justify-content-end">
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




        </>
    );
};

export default CommentList;
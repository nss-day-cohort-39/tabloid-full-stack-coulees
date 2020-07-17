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

            <Button color="primary" className="mb-3" onClick={addModalToggle}>Add Comment</Button>
            {/*post ? (<h3>Comments for {post.title}</h3>) : (<h3>Comments for post</h3>)*/}
            <ListGroup>
                {
                    (comments.length)
                        ? comments.map((comment, index) => (
                            <ListGroupItem key={comment.id} className={index % 2 === 0 ? "" : "bg-light"}>
                                <Comment comment={comment} />
                            </ListGroupItem>

                        ))
                        : <div className="alert alert-secondary mt-1" role="alert">There were no comments found.</div>
                }
            </ListGroup>

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
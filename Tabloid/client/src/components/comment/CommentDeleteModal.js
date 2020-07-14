import React, { useContext, useEffect } from "react";
import { Button, Form } from 'reactstrap';
import { CommentContext } from "../../providers/CommentProvider";
import { useParams } from "react-router-dom";

const CommentDeleteModal = ({ toggle, comment }) => {

    const { getCommentByPostId, deleteComment } = useContext(CommentContext);



    const { id } = useParams();

    const submitForm = (e) => {
        e.preventDefault();
        deleteComment(comment.id)
            .then(() => getCommentByPostId(id))
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <>
            <Form onSubmit={submitForm}>
                <div className="lead mb-2">Are you sure you wish to delete this comment?</div>
                <div className="text-right">
                    <Button
                        type="button"
                        color="secondary"
                        onClick={toggle}
                    >Cancel</Button>
                    <Button
                        type="submit"
                        color="danger"
                        className="ml-2"
                    >Delete</Button>
                </div>
            </Form>
        </>
    )
}

export default CommentDeleteModal;
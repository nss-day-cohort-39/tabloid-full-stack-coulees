import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import { useParams } from "react-router-dom";


const CommentForm = ({ toggle }) => {

    const { getCommentByPostId, addComment } = useContext(CommentContext);

    const subject = useRef();
    const content = useRef();
    const { id } = useParams();

    const submitForm = (e) => {
        e.preventDefault();
        addComment(
            {
                postId: parseInt(id),
                subject: subject.current.value,
                content: content.current.value
            }
        )
            .then(() => getCommentByPostId(id))
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="postTitle">Subject</Label>
                <Input type="text" name="commentSubject" id="commentSubject" innerRef={subject} placeholder="" />
            </FormGroup>

            <FormGroup>
                <Label for="postTitle">Content</Label>
                <Input type='textarea' name="commentComment" id="commentComment" innerRef={content} placeholder="" />
            </FormGroup>

            <FormGroup className="text-right">
                <Button
                    type="button"
                    color="secondary"
                    onClick={toggle}
                >Cancel</Button>
                <Button
                    type="submit"
                    color="primary"
                    className="ml-2"
                >Save</Button>
            </FormGroup>
        </Form>
    )

}

export default CommentForm;
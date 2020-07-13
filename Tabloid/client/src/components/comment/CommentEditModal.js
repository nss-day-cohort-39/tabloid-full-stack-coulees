import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";

const CommentEditModal = ({ toggle, comment }) => {

    const { getAllComments, editComment } = useContext(CommentContext);

    const subject = useRef();
    const content = useRef();

    const submitForm = (e) => {
        e.preventDefault();
        editComment(comment.id, { id: comment.id, subject: subject.current.value })
            .then(getAllComments)
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="commentSubject">Subject</Label>
                <Input type="text" name="commentSubject" id="commentSubject" innerRef={subject} defaultValue={comment.subject} />
            </FormGroup>

            <FormGroup>
                <Label for="commentSubject">Content</Label>
                <Input type="text" name="commentContent" id="commentContent" innerRef={content} defaultValue={comment.content} />
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

export default CommentEditModal;
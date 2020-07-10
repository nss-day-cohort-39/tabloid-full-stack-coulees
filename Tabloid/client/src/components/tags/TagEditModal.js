import React, { useContext, useRef } from "react";
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

const TagEditModal = ({ toggle, tag }) => {

    const { getAllTags, editTag } = useContext(TagContext);

    const name = useRef();

    const submitForm = (e) => {
        e.preventDefault();
        editTag(tag.id, { id: tag.id, name: name.current.value })
            .then(getAllTags)
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="postTitle">Name</Label>
                <Input type="text" name="tagName" id="tagName" innerRef={name} defaultValue={tag.name} />
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

export default TagEditModal;
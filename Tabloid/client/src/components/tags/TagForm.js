import React, { useContext, useRef, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

const TagForm = ({ toggle }) => {

    const { tags, getAllTags, addTag } = useContext(TagContext);

    useEffect(() => {
        getAllTags()
    }, []);

    console.log(tags);

    const name = useRef();

    const [showError, setError] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();

        const alreadyExists = tags.filter(tag => tag.name === name.current.value);

        if (!alreadyExists) {
            setError(true);
        } else {
            addTag({ name: name.current.value })
                .then(getAllTags)
                .then(toggle)
                .catch((err) => alert(`An error ocurred: ${err.message}`));
        }
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="postTitle">Name</Label>
                <Input type="text" name="tagName" id="tagName" innerRef={name} placeholder="" />
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
                <Alert color="danger" isOpen={showError}>
                    This tag already exists!
                </Alert>
            </FormGroup>
        </Form>
    )

}

export default TagForm;
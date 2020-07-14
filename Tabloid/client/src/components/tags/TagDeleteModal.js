import React, { useContext } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button, Form } from 'reactstrap';

const TagDeleteModal = ({ toggle, tag }) => {

    const { getAllTags, deleteTag } = useContext(TagContext);

    const submitForm = (e) => {
        e.preventDefault();
        deleteTag(tag.id)
            .then(getAllTags)
            .then(toggle)
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    return (
        <>
            <Form onSubmit={submitForm}>
                <div className="lead mb-2">Are you sure you wish to delete the tag "{tag.name}"?</div>
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

export default TagDeleteModal;
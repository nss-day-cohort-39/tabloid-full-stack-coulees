import React, { useContext, useRef, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

const PostTagForm = ({ chosenTags, setChosenTags }) => {

    const { tags, getAllTags } = useContext(TagContext);

    const [selectedTagId, setSelectedTagId] = useState({});

    useEffect(() => {
        getAllTags()
    }, []);

    const updateChosenTags = (e) => {
        e.preventDefault();

        //get the tag object to pass to the chosenTags array
        const chosenTag = tags.find(tag => tag.id === +selectedTagId);

        setChosenTags(chosenTags.concat(chosenTag));
    };

    return (
        <>
            <FormGroup>
                <Label for="postTitle">Tags</Label>
                <select id="tags" className="form-control" onChange={e => setSelectedTagId(e.target.value)}>
                    <option>Select...</option>
                    {
                        tags.map(tag => {
                            return (<option key={"tag-" + tag.id} id={"opt-" + tag.name} value={tag.id}>{tag.name}</option>)
                        })
                    }
                </select>
                <Button id="addTagButton" type="button" color="primary" onClick={updateChosenTags}>Add</Button>
            </FormGroup>
        </>
    )

}

export default PostTagForm;
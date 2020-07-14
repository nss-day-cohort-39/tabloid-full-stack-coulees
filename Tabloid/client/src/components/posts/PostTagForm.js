import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, Badge } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";

const PostTagForm = () => {

    const { tags, getAllTags } = useContext(TagContext);

    //state to store the tag array
    const [chosenTags, setChosenTags] = useState([]);

    //state for the tag select drop-down value
    const [selectedTagId, setSelectedTagId] = useState({});

    useEffect(() => {
        getAllTags()
    }, []);

    //state for the options that appear in the tag drop-down
    const [tagOptions, setTagOptions] = useState([]);
    useEffect(() => {
        setTagOptions(tags);
    }, [tags]);

    const updateChosenTags = (e) => {
        e.preventDefault();

        //check to see if the current tag has already been selected
        if (!chosenTags.some(tag => tag.id === +selectedTagId)) {
            //get the tag object to pass to the chosenTags array
            const chosenTag = tags.find(tag => tag.id === +selectedTagId);

            setChosenTags(chosenTags.concat(chosenTag));

            //remove chosen option from the drop-down
            setTagOptions(tagOptions.filter(tag => tag.id !== +selectedTagId));
        }
    };

    return (
        <>
            <FormGroup>
                <Label for="postTitle">Tags</Label>
                <select id="tags" className="form-control" onChange={e => setSelectedTagId(e.target.value)}>
                    <option>Select...</option>
                    {
                        tagOptions.map(tag => {
                            return (<option key={"tag-" + tag.id} id={"opt-" + tag.name} value={tag.id}>{tag.name}</option>)
                        })
                    }
                </select>
                <Button id="addTagButton" type="button" color="primary" onClick={updateChosenTags}>Add</Button>
            </FormGroup>
            <div id="tagPreview">
                {
                    chosenTags.length > 0
                        ?
                        chosenTags.map(tag => <Badge key={"tag-" + tag.id}>{tag.name}</Badge>)
                        :
                        <Badge>No Tags Chosen</Badge>
                }
            </div>
        </>
    )

}

export default PostTagForm;
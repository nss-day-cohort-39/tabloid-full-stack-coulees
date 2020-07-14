import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup, Label, Button, Badge, InputGroup, InputGroupAddon } from "reactstrap";
import { TagContext } from "../../providers/TagProvider";
import xIcon from "../tags/x.svg"

const PostTagForm = ({ chosenTags, setChosenTags }) => {

    const { tags, getAllTags } = useContext(TagContext);

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

    const removeTag = (id) => {
        //remove the tag from the chosen tags array
        setChosenTags(chosenTags.filter(tag => tag.id !== id));

        //add the tag back to the tagOptions drop-down
        const chosenTag = tags.find(tag => tag.id === id);
        if (!tagOptions.some(tag => tag.id === id)) {
            setTagOptions(tagOptions.concat(chosenTag));
        }
    }

    return (
        <>
            <FormGroup>
                <Label for="postTitle">Tags</Label>
                <InputGroup>
                    <select id="tags" className="form-control" onChange={e => setSelectedTagId(e.target.value)}>
                        <option>Select...</option>
                        {
                            tagOptions.map(tag => {
                                return (<option key={"tag-" + tag.id} id={"opt-" + tag.name} value={tag.id}>{tag.name}</option>)
                            })
                        }
                    </select>
                    <InputGroupAddon addonType="append">
                        <Button id="addTagButton" type="button" color="secondary" onClick={updateChosenTags}>Add</Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <div id="tagPreview">
                {
                    chosenTags.length > 0
                        ?
                        chosenTags.map(tag => <Badge key={"tag-" + tag.id} className="pt-1 pl-2 mr-2 mb-2" color="info" style={{ cursor: "pointer" }} onClick={() => { removeTag(tag.id) }}>{tag.name} <img src={xIcon} /></Badge>)
                        :
                        <Badge color="light" className="pt-1 pl-2 mr-2 mb-2">No Tags Chosen</Badge>
                }
            </div>
        </>
    )

}

export default PostTagForm;
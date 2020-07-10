import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import { ListGroup, ListGroupItem } from 'reactstrap';


const TagList = () => {
    const { tags, getAllTags } = useContext(TagContext);

    useEffect(() => {
        getAllTags()
    }, []);

    console.log(tags);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    <ListGroup>
                        {
                            (tags.length)
                                ? tags.map((tag) => (
                                    <ListGroupItem key={tag.id}>{tag.name}</ListGroupItem>
                                ))
                                : <div className="alert alert-secondary mt-1" role="alert">There are no tags.</div>
                        }
                    </ListGroup>
                </div>
            </div>
        </div>
    );
};

export default TagList;
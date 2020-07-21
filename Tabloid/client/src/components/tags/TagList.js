import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import TagDeleteModal from "./TagDeleteModal";
import TagForm from "./TagForm";
import TagEditModal from "./TagEditModal";
import "./Tags.css";

const TagList = () => {
    const { tags, getAllTags } = useContext(TagContext);

    useEffect(() => {
        getAllTags()
    }, []);

    //modal states for the add tag pop up
    const [addModal, setAddModal] = useState(false)
    const addModalToggle = () => setAddModal(!addModal)

    //modal states for the edit tag pop up
    const [editModal, setEditModal] = useState(false)
    const editModalToggle = () => setEditModal(!editModal)

    //modal states for the delete tag pop up
    const [deleteModal, setDeleteModal] = useState(false)
    const deleteModalToggle = () => setDeleteModal(!deleteModal)

    //state for the current chosen tag
    const [chosenTag, setChosenTag] = useState(null)

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div id="tagList" className="cards-column">
                        <Button color="primary" onClick={addModalToggle} className="mb-4">Create Tag</Button>
                        <ListGroup>
                            {
                                (tags.length)
                                    ? tags.map((tag) => (
                                        <ListGroupItem key={tag.id} className="d-flex justify-content-between">
                                            {tag.name}
                                            <div className="d-flex justify-content-end">
                                                <Button color="info" outline size="sm" className="ml-2" onClick={() => { setChosenTag(tag); editModalToggle(); }}>Edit</Button>
                                                <Button color="danger" outline size="sm" className="ml-2" onClick={() => { setChosenTag(tag); deleteModalToggle(); }}>Delete</Button>
                                            </div>
                                        </ListGroupItem>
                                    ))
                                    : <div className="alert alert-secondary mt-1" role="alert">There are no tags.</div>
                            }
                        </ListGroup>
                    </div>
                </div>
            </div>

            <Modal isOpen={addModal} toggle={addModalToggle}>
                <ModalHeader toggle={addModalToggle}>
                    Create a Tag
                </ModalHeader>
                <ModalBody>
                    <TagForm toggle={addModalToggle} />
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggle={editModalToggle}>
                <ModalHeader toggle={editModalToggle}>
                    Edit Tag
                </ModalHeader>
                <ModalBody>
                    <TagEditModal toggle={editModalToggle} tag={chosenTag} />
                </ModalBody>
            </Modal>

            <Modal isOpen={deleteModal} toggle={deleteModalToggle}>
                <ModalHeader toggle={deleteModalToggle}>
                    Delete Tag
                </ModalHeader>
                <ModalBody>
                    <TagDeleteModal toggle={deleteModalToggle} tag={chosenTag} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default TagList;
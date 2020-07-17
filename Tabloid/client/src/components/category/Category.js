import React, { useState } from "react"
import { Modal, Button, ModalHeader, ModalBody, ListGroupItem } from 'reactstrap'
import DeleteCategory from "./DeleteCategory";
import { EditCategory } from "./EditCategory";
import "./Category.css";



const Category = ({ category }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    return (
        <>
            <ListGroupItem key={category.id} className="d-flex justify-content-between">
                {category.name}
                <div className="d-flex justify-content-end">
                    <Button color="info" outline size="sm" className="ml-2" onClick={toggleEdit}>Edit</Button>
                    <Button color="danger" outline size="sm" className="ml-2" onClick={toggle}>Delete</Button>
                </div>
            </ListGroupItem>

            <Modal isOpen={modal} toggle={toggle} size="md">
                <ModalHeader toggle={toggle}>{category.name}</ModalHeader>
                <ModalBody>
                    <DeleteCategory category={category} toggleDelete={toggle} />
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggle={toggleEdit} className="modal-md">
                <ModalHeader toggle={toggleEdit}>{category.name}</ModalHeader>
                <ModalBody>
                    <EditCategory selectedCategory={category} toggleEdit={toggleEdit} />
                </ModalBody>
            </Modal>
        </>
    );
};

export default Category;
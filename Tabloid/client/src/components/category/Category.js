import React, { useState } from "react"
import { Link } from "react-router-dom"
import {Modal, Button, ModalHeader, ModalBody} from 'reactstrap'
import DeleteCategory from "./DeleteCategory";
import { EditCategory } from "./EditCategory";

const Category = ({ category }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
     console.log("cat ->", category)
    return (
        <>
            <div className = "category">           
                <Link to={`/category/`}>
                    {category.name} <Button onClick = {toggleEdit} color="info">Edit</Button>
                    <span><Button onClick = {toggle} color="danger">Delete</Button></span>
                </Link>
            </div>
            
            <Modal isOpen = {modal} toggle = {toggle} size = "md">
                <ModalHeader toggle = {toggle}>{category.name}</ModalHeader>
                <ModalBody>
                    <DeleteCategory category = {category} toggleDelete = {toggle} />
                </ModalBody>
            </Modal>   

            <Modal isOpen = {editModal} toggle = {toggleEdit} className = "modal-sm">
                <ModalHeader toggle = {toggleEdit}>Editing {category.name}</ModalHeader>
                    <ModalBody>
                        <EditCategory selectedCategory = {category} toggleEdit = {toggleEdit} />
                </ModalBody>
            </Modal>  
        </>
    );
};

export default Category;
import React, { useState } from "react"
import {Modal, Button, ModalHeader, ModalBody} from 'reactstrap'
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
            <div className = "category">     
                <div className = "row category"> 
                    <div className = "col-sm-3 my-auto">{category.name} </div>
                    <div className = "col-sm-1 my-auto"><Button color = "info" size="sm" onClick = {toggleEdit}>Edit</Button></div>
                    <div className = "col-sm-1 my-auto"><span><Button color="danger" size="sm" onClick = {toggle}>Delete</Button></span></div>
                </div> 
            </div>
            
            <Modal isOpen = {modal} toggle = {toggle} size = "md">
                <ModalHeader toggle = {toggle}>{category.name}</ModalHeader>
                <ModalBody>
                    <DeleteCategory category = {category} toggleDelete = {toggle} />
                </ModalBody>
            </Modal>   

            <Modal isOpen = {editModal} toggle = {toggleEdit} className = "modal-md">
                <ModalHeader toggle = {toggleEdit}>{category.name}</ModalHeader>
                <ModalBody>
                    <EditCategory selectedCategory = {category} toggleEdit = {toggleEdit} />
                </ModalBody>
            </Modal>  
        </>
    );
};

export default Category;
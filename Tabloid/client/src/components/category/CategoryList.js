import React, { useContext, useEffect, useState } from 'react'
import Category from './Category';
import { CategoryContext } from '../../providers/CategoryProvider';
import { Button, Modal, ModalHeader, ModalBody, ListGroup } from 'reactstrap';
import { CategoryForm } from './CategoryForm';

const CategoryList = () => {
    const { categories, getAllCategory } = useContext(CategoryContext);

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const renderListItem = (category) => {
        if(category.id > 0){
            return (<div key={"categoryWrapper-"+category.id} className = "container fluid categoryContainer">
                     <Category key={"category-"+category.id} category={category} />
                    </div>)
        }
    }
    
    useEffect(() => {
        getAllCategory()       
    }, []);
    return (
        <>
            <Button onClick = {toggle} color = "info" size = "sm" className = "addNewCategory">Create Category</Button>
            <div>
                {
                    (categories.length) 
                    ? categories.map((category) => (
                        renderListItem(category)
                    )) 
                    : <div className="alert alert-secondary mt-1" role="alert"> No categories were found.</div>
                }
            </div>
            <Modal isOpen = {modal} toggle = {toggle} className = "modal-md">
                <ModalHeader isOpen = {modal} toggle = {toggle}>Create New Category</ModalHeader>
                <ModalBody>
                    <CategoryForm toggle= {toggle} />
                </ModalBody>
            </Modal> 
        </>
    );
}

export default CategoryList
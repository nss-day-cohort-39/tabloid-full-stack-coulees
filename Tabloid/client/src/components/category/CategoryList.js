import React, { useContext, useEffect, useState } from 'react'
import Category from './Category';
import { CategoryContext } from '../../providers/CategoryProvider';
import { Button, Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem } from 'reactstrap';
import { CategoryForm } from './CategoryForm';

const CategoryList = () => {
    const { categories, getAllCategory } = useContext(CategoryContext);

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const renderListItem = (category) => {
        if (category.id > 0) {
            return (
                <Category key={"category-" + category.id} category={category} />
            )
        }
    }

    useEffect(() => {
        getAllCategory()
    }, []);
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div id="tagList" className="cards-column">
                        <Button color="primary" onClick={toggle} className="mb-4">Create Category</Button>
                        <ListGroup>
                            {
                                (categories.length)
                                    ? categories.map((category) => (
                                        renderListItem(category)
                                    ))
                                    : <div className="alert alert-secondary mt-1" role="alert">There are no categories.</div>
                            }
                        </ListGroup>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} className="modal-md">
                <ModalHeader toggle={toggle}>Create New Category</ModalHeader>
                <ModalBody>
                    <CategoryForm toggle={toggle} />
                </ModalBody>
            </Modal>
        </>
    );
}

export default CategoryList
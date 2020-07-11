import React, { useContext } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button, Form } from 'reactstrap';


const DeleteCategory = ({category, toggleDelete}) => {

    const { getAllCategory, deleteCategory } = useContext(CategoryContext);

    const submitForm = (e) => {
        e.preventDefault();
        deleteCategory(category.id)
            .then(getAllCategory)
            .then(toggleDelete)
            .catch((err) => alert(`An error ocurred: ${err.message}`));            
    };
    return (
        <>
            <Form onSubmit={submitForm}>
                <div className="lead mb-2">Are you sure you wish to delete the category "{category.name}"?</div>
                <div className="text-right">
                    <Button type="button" color="secondary" onClick={toggleDelete}>Cancel</Button>
                    <Button type="submit" color="danger" className="ml-2">Delete</Button>
                </div>
            </Form>
        </>
    )
}

export default DeleteCategory;
import React, { useState, useContext } from "react"
import { CategoryContext } from "../../providers/CategoryProvider"
import { Button, Form, FormGroup } from "reactstrap"

export const EditCategory = ({ selectedCategory, toggleEdit }) => {
    // Separate state variable to track the category as it is edited
    const [updatedCategory, setCategory] = useState(selectedCategory)
    const { getAllCategory, updateCategory } = useContext(CategoryContext)

    const handleControlledInputChange = (event) => {
        // Create a new copy of the category being edited
        const newCategory = Object.assign({}, updatedCategory)
        // Change the property value on the copy
        newCategory[event.target.name] = event.target.value

        // Set the copy as the new state
        setCategory(newCategory)
    }
    const editCategory = () => {
        if (updatedCategory.name !== "") {
            if (updatedCategory.id !== 0) {
                updateCategory({
                    id: parseInt(updatedCategory.id),
                    name: updatedCategory.name
                })
                    .then(getAllCategory)
                    .then(toggleEdit)
            }
        } else {
            window.alert("Name is required!")
        }
    }
    return (
        <Form className="editCategory">
            <FormGroup>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    autoFocus
                    className="form-control"
                    defaultValue={selectedCategory.name}
                    onChange={handleControlledInputChange}
                />
            </FormGroup>
            <FormGroup className="text-right">
                <Button
                    type="button"
                    color="secondary"
                    onClick={toggleEdit}>Cancel</Button>
                <Button
                    type="submit"
                    color="primary"
                    className="ml-2"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            editCategory()
                        }
                    }>Save Changes</Button>
            </FormGroup>
        </Form>
    )
}
import React, { useContext, useRef, useState } from "react"
import { Form, Alert } from "reactstrap"
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory } from 'react-router-dom'

export const CategoryForm = ({ toggle }) => {
    const { categories, getAllCategory, addCategory } = useContext(CategoryContext)
    const name = useRef("name")
    const history = useHistory();

    const [showError, setError] = useState(false);

    const addNewCategory = () => {
        const alreadyExists = categories.some(cat => cat.name.toLowerCase() === name.current.value.toLowerCase());

        if (alreadyExists) {
            setError(true);
        } else {
            return addCategory({
                name: name.current.value
            })
                .then(toggle)
                .then(getAllCategory)
                .then(() => {
                    history.push("/category")
                })
        }

    }

    return (
        <Form className="categoryForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        ref={name}
                        required
                        autoFocus
                        className="form-control categoryName"
                        placeholder=""
                        onChange={() => setError(false)}
                    />
                </div>
            </fieldset>
            <fieldset className="text-right">
                <button type="button" onClick={toggle} className="btn btn-secondary">Cancel</button>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            addNewCategory()
                        }
                    }
                    className="btn btn-primary ml-2">
                    Save
            </button>
                <Alert color="danger" isOpen={showError} className="mt-2 text-center">
                    This category already exists!
                </Alert>
            </fieldset>
        </Form>
    )
}
import React, { useContext, useRef } from "react"
import { Form } from "reactstrap"
import { CategoryContext } from "../../providers/CategoryProvider"
import {useHistory} from 'react-router-dom'

export const CategoryForm = ({toggle}) => {
    const { getAllCategory, addCategory } = useContext(CategoryContext)
    const name = useRef("name")
    const history = useHistory();
    const addNewCategory = () => {
        return addCategory({
            name: name.current.value
        })
        .then(toggle)
        .then(getAllCategory)
        .then(() => {
            history.push("/category")
        })
    }
    
    return (
        <Form className="categoryForm">
            <fieldset>
                <div className="form-group">
                    <input
                        type="text"
                        id="name"
                        ref={name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="category name"
                    />
                </div>
            </fieldset>      
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        addNewCategory()
                    }
                }
                className="btn btn-primary">
                Save Category
            </button>
        </Form>
    )
}
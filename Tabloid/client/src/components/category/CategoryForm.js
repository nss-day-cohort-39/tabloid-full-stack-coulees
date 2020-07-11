import React, { useContext, useRef } from "react"
import {useHistory} from 'react-router-dom'
import { Form } from "reactstrap"
import { CategoryContext } from "../../providers/CategoryProvider"


export const CategoryForm = () => {
    const { addCategory } = useContext(CategoryContext)
    const history = useHistory()
    const name = useRef("name")
    const form = useRef("form")

    const addNewCategory = () => {
        return addCategory({
            name: name.current.value
        }).then(() => {
            history.push("/category")
        })
    }
    
    return (
        <Form className="categoryForm" ref={form}>
            <h2 className="categoryForm__title">New Category</h2>
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
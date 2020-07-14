import React, { useState, useContext } from "react"
import { CategoryContext } from "../../providers/CategoryProvider"

export const EditCategory = ({ selectedCategory, toggleEdit }) => {
    // Separate state variable to track the category as it is edited
    const [ updatedCategory, setCategory ] = useState(selectedCategory)
    const {getAllCategory, updateCategory} = useContext(CategoryContext)

    const handleControlledInputChange = (event) => {
        // Create a new copy of the category being edited
        const newCategory = Object.assign({}, updatedCategory)
        // Change the property value on the copy
        newCategory[event.target.name] = event.target.value

        // Set the copy as the new state
        setCategory(newCategory)
    }
    const editCategory = () => {
        if(updatedCategory.name !== "")
        {
            if(updatedCategory.id !== 0){
                updateCategory({
                    id: parseInt(updatedCategory.id),
                    name: updatedCategory.name
                })
                .then(getAllCategory)
                .then(toggleEdit)
            }
        }else{
            window.alert("Name is required!")
        }        
    }
    return (
        <form className="editCategory">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Category Name </label>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        autoFocus 
                        className="form-control"
                        defaultValue={selectedCategory.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            
            <button 
                type="submit" 
                className="btn btn-primary"
                onClick={ 
                    evt => { 
                        evt.preventDefault()
                        editCategory()
                    }
                }> Save Changes </button>            
        </form>
    )
}
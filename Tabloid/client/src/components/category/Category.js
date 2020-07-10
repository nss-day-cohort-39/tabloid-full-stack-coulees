import React from "react"
import { Link } from "react-router-dom"

const Category = ({ category }) => {
    return (
        <div className = "category">           
            <Link to={`/category/`}>
                {category.name}
            </Link>
        </div>
    );
};

export default Category;
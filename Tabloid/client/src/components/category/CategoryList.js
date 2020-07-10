import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import Category from './Category';
import { CategoryContext } from '../../providers/CategoryProvider';

const CategoryList = () => {
    const { categories, getAllCategory } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategory()
    }, []);
    return (
        <>
            <Link to={`/addCategory`}>Add New Category</Link>
            <div>
                {
                    (categories.length)
                        ? categories.map((category) => (
                            <Category key={category.id} category={category} />
                        ))
                        : <div className="alert alert-secondary mt-1" role="alert"> No categories were found.</div>
                }
            </div>
        </>
    );
}

export default CategoryList
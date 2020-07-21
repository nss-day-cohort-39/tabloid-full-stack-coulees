import React, { useContext } from 'react';
import { Form, Input } from 'reactstrap';
import { PostContext } from '../../providers/PostProvider';


const PostSearch = () => {
    const { searchPosts } = useContext(PostContext);
    const search = e => {
        searchPosts(e.target.value)
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <Form>
                    <Input placeholder="Search Posts..." onChange={search} />
                </Form>
            </div>
        </div>
    )

}

export default PostSearch
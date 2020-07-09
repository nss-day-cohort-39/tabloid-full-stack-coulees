import React, { useContext, useEffect } from 'react'
import { PostContext } from '../../providers/PostProvider';
import Post from './Post';

const MyPosts = () => {
    const { posts, getPostsByUser } = useContext(PostContext);

    useEffect(() => {
        getPostsByUser()
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {
                        (posts.length)
                            ? posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))
                            : <div className="alert alert-secondary mt-1" role="alert"> No posts were found.</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default MyPosts
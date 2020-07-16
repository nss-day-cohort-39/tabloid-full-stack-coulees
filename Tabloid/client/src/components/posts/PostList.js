import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../providers/PostProvider';
import Post from './Post';
import { Spinner } from 'reactstrap';

const PostFeed = () => {
    const { posts, getPublishedPosts } = useContext(PostContext);
    const [ready, set] = useState(false)

    useEffect(() => {
        getPublishedPosts().then(() => set(true))
    }, []);

    if (ready) {
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
    else {
        return <Spinner />
    }
}

export default PostFeed
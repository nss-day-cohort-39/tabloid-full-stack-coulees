import React from "react"
import { Card, CardImg, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

const Post = ({ post }) => {
    return (
        <Card className="m-4" id={`post-${post.id}`}>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <strong><Link to={`/posts/${post.id}`}>{post.title}</Link></strong>
                <div className="text-left px-2">{post.userProfile.fullName}</div>
            </CardBody>
        </Card>
    );
};

export default Post;
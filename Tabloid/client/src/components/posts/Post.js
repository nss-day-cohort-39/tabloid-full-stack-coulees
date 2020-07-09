import React from "react"
import { Card, CardImg, CardBody } from "reactstrap"

const Post = ({ post }) => {
    return (
        <Card className="m-4" id={`post-${post.id}`}>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <strong>{post.title}</strong>
                <div className="text-left px-2">{post.userProfile.fullName}</div>
            </CardBody>
        </Card>
    );
};

export default Post;
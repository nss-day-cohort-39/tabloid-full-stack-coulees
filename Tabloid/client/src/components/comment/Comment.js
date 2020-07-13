import React from "react"
import { Card, CardBody } from "reactstrap"


const Comment = ({ comment }) => {

    const date = new Date(comment.createDateTime);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);

    return (
        <Card className="m-4" id={`comment-${comment.id}`}>
            <CardBody>
                <div className="text-left px-2"><strong>Post Title:</strong> {comment.post.title}</div>
                <div className="text-left px-2"><strong>Display Name:</strong>  {comment.userProfile.displayName}</div>
                <div className="text-left px-2"><strong>Subject:</strong>  {comment.subject}</div>
                <div className="text-left px-2"><strong>Content:</strong> {comment.content}</div>
                <div className="text-left px-2"><strong>Date:</strong>  {dateTimeFormat}</div>
            </CardBody>
        </Card>
    );
};

export default Comment;



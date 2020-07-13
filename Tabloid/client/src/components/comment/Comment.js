import React from "react"
import { ListGroup } from "reactstrap"


const Comment = ({ comment }) => {

    const date = new Date(comment.createDateTime);
    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);

    return (
        <ListGroup>
            <div className="text-left px-2"><h3>{comment.post.title}</h3></div>
            <div className="text-left px-2">Posted by {comment.userProfile.displayName} on {dateTimeFormat}</div>
            <div className="text-left px-2"><strong>Subject:</strong>  {comment.subject}</div>
            <div className="text-left px-2"><strong>Content:</strong> {comment.content}</div>
        </ListGroup>
    );
};

export default Comment;



import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const CommentCard = ({ comments }) => {
  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <Card className='comments-section'>
      <Card.Header>Comments</Card.Header>
      <ListGroup variant='flush'>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.comment_id}>
            <p>
              <strong>{comment.username}</strong> (
              {new Date(comment.created_at).toLocaleDateString()}):
            </p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default CommentCard;

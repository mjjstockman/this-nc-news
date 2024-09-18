import { useEffect, useState } from 'react';
import { fetchCommentsByArticleId } from '../../utils/api';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';

const CommentCard = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

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

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postCommentByArticleId } from '../../utils/api';

function CommentForm({ articleId, onCommentSubmit }) {
  const [comment, setComment] = useState('');

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: 'jessjelly',
      body: comment,
    };

    console.log('Posting comment:', { articleId, payload });

    postCommentByArticleId(articleId, payload)
      .then((newComment) => {
        onCommentSubmit(newComment);
        setComment('');
      })
      .catch((err) => {
        console.error('Error posting comment:', err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='commentInput'>
        <Form.Label>Leave a Comment</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='Enter your comment'
          value={comment}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
}

export default CommentForm;

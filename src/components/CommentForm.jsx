import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postCommentByArticleId } from '../../utils/api';
import { ToastContainer, Toast } from 'react-bootstrap';

function CommentForm({ articleId, onCommentSubmit }) {
  const [comment, setComment] = useState('');
  const [isUpdatingComments, setIsUpdatingComments] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success'); 

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdatingComments(true);

    const payload = {
      username: 'jessjelly', 
      body: comment,
    };

    postCommentByArticleId(articleId, payload)
      .then((newComment) => {
        onCommentSubmit(newComment);
        setComment('');
        setToastMessage('Comment submitted successfully!');
        setToastVariant('success');
        setShowToast(true);
      })
      .catch((err) => {
        console.error('Error posting comment:', err);
        setToastMessage('Error submitting comment.');
        setToastVariant('danger');
        setShowToast(true);
      })
      .finally(() => {
        setIsUpdatingComments(false);
      });
  };

  return (
    <>
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
        <Button variant='primary' type='submit' disabled={isUpdatingComments}>
          {isUpdatingComments ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer
        className='position-fixed top-0 start-50 translate-middle-x'
        style={{ zIndex: 9999 }}>
        {showToast && (
          <Toast
            bg={toastVariant} // Dynamic background color based on success or error
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide>
            <Toast.Header>
              <strong className='mr-auto'>Comment Submission</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </>
  );
}

export default CommentForm;

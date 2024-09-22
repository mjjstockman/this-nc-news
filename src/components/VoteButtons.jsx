import { useState } from 'react';
import { patchArticleById } from '../../utils/api';
import Icons from './Icons';
import ToastNotification from './ToastNotification';

const VoteButtons = ({ article_id, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isUpdatingVotes, setIsUpdatingVotes] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const handleVote = (inc_votes) => {
    const originalVotes = votes;
    setVotes(votes + inc_votes);
    setIsUpdatingVotes(true);

    patchArticleById(article_id, inc_votes)
      .then((updatedArticle) => {
        setVotes(updatedArticle.votes);
        setIsUpdatingVotes(false);
        setToastMessage('Vote submitted successfully!');
        setToastVariant('success');
        setShowToast(true);
      })
      .catch((err) => {
        console.error('Error updating votes:', err);
        setVotes(originalVotes);
        setIsUpdatingVotes(false);
        setToastMessage('Error submitting vote.');
        setToastVariant('danger');
        setShowToast(true);
      });
  };

  return (
    <div>
      <>
        <button onClick={() => handleVote(1)} disabled={isUpdatingVotes}>
          <Icons type='thumbs-up' />{' '}
          {isUpdatingVotes ? 'Updating Votes...' : 'Like'}
        </button>
        <button onClick={() => handleVote(-1)} disabled={isUpdatingVotes}>
          <Icons type='thumbs-down' />{' '}
          {isUpdatingVotes ? 'Updating Votes...' : 'Dislike'}
        </button>
      </>

      {/* {voteError && <div>{voteError}</div>} */}
      <p>Votes: {votes}</p>

      <ToastNotification
        show={showToast}
        message={toastMessage}
        variant={toastVariant}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default VoteButtons;

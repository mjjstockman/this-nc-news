import { useState } from 'react';
import { patchArticleById } from '../../utils/api';
import Icons from './Icons';

const VoteButtons = ({ article_id, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isUpdatingVotes, setIsUpdatingVotes] = useState(false);
  const [voteError, setVoteError] = useState(null);

  const handleVote = (inc_votes) => {
    const originalVotes = votes;
    setVotes(votes + inc_votes);
    setIsUpdatingVotes(true);
    setVoteError(null);

    patchArticleById(article_id, inc_votes)
      .then((updatedArticle) => {
        setVotes(updatedArticle.votes);
        setIsUpdatingVotes(false);
      })
      .catch((err) => {
        console.error('Error updating votes:', err);
        setVotes(originalVotes);
        setVoteError('Failed to update votes. Please try again.');
        setIsUpdatingVotes(false);
      });
  };

  return (
    <div>
      {isUpdatingVotes ? (
        <p>Updating votes...</p>
      ) : (
        <>
          <button onClick={() => handleVote(1)} disabled={isUpdatingVotes}>
            <Icons type='thumbs-up' /> Like
          </button>
          <button onClick={() => handleVote(-1)} disabled={isUpdatingVotes}>
            <Icons type='thumbs-down' /> Dislike
          </button>
        </>
      )}

      {voteError && <div>{voteError}</div>}
      <p>Votes: {votes}</p>
    </div>
  );
};

export default VoteButtons;

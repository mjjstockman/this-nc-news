import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, patchArticleById } from '../../utils/api';
import Card from 'react-bootstrap/Card';
import CommentCard from './CommentCard';
import Icons from './Icons';

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingVotes, setIsUpdatingVotes] = useState(false);
  const [voteError, setVoteError] = useState(null);

  useEffect(() => {
    fetchArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (inc_votes) => {
    if (!article) return;

    const originalVotes = article.votes;
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + inc_votes,
    }));
    setIsUpdatingVotes(true);
    setVoteError(null);

    patchArticleById(article_id, inc_votes)
      .then((updatedArticle) => {
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: updatedArticle.votes,
        }));
        setIsUpdatingVotes(false);
      })
      .catch((err) => {
        console.error('Error updating votes:', err);
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: originalVotes,
        }));
        setVoteError('Failed to update votes. Please try again.');
        setIsUpdatingVotes(false);
      });
  };

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  return (
    <>
      <Card className='article-card mb-3'>
        <Card.Img
          variant='top'
          src={article.article_img_url}
          alt={article.title}
          className='article-image'
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>
              Created at: {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
            <p>{article.body}</p>

            {isUpdatingVotes ? (
              <p>Updating votes...</p>
            ) : (
              <>
                <button
                  onClick={() => handleVote(1)}
                  disabled={isUpdatingVotes}>
                  <Icons type='thumbs-up' /> Like
                </button>
                <button
                  onClick={() => handleVote(-1)}
                  disabled={isUpdatingVotes}>
                  <Icons type='thumbs-down' /> Dislike
                </button>
              </>
            )}

            {voteError && <p>{voteError}</p>}
          </Card.Text>
        </Card.Body>
      </Card>
      <CommentCard />
    </>
  );
};

export default ArticleDetail;

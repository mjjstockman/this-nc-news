import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById, fetchCommentsByArticleId } from '../../utils/api';
import Card from 'react-bootstrap/Card';
import CommentCard from './CommentCard';
import VoteButtons from './VoteButtons';
import CommentForm from './CommentForm';

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        return fetchCommentsByArticleId(article_id);
      })
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleAddComment = (newComment) => {
    setComments((currComments) => [newComment, ...currComments]);
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
            <p>Comments: {article.comment_count}</p>
            <p>{article.body}</p>
            <VoteButtons article_id={article_id} initialVotes={article.votes} />
          </Card.Text>
        </Card.Body>
      </Card>
      <CommentForm articleId={article_id} onCommentSubmit={handleAddComment} />
      <CommentCard comments={comments} />
    </>
  );
};

export default ArticleDetail;

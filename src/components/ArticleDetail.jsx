import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../utils/api';
import Card from 'react-bootstrap/Card';
import CommentCard from './CommentCard';
import Icons from './Icons';

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
            <button>
              <Icons type='thumbs-up' /> Like
            </button>
            <button>
              <Icons type='thumbs-down' /> Dislike
            </button>
          </Card.Text>
        </Card.Body>
      </Card>
      <CommentCard />
    </>
  );
};

export default ArticleDetail;

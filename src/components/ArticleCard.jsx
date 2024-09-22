import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`}>
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
            <div>Topic: {article.topic}</div>
            <div>Author: {article.author}</div>
            <div>
              Created at: {new Date(article.created_at).toLocaleDateString()}
            </div>
            <div>Votes: {article.votes}</div>
            <div>Comments: {article.comment_count}</div>
            <div>{article.body}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ArticleCard;

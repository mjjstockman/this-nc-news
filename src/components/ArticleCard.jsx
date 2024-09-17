import Card from 'react-bootstrap/Card';

const ArticleCard = ({ article, showBody = false }) => {
  return (
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
          <p>Created at: {new Date(article.created_at).toLocaleDateString()}</p>
          <p>Votes: {article.votes}</p>
          <p>Comments: {article.comment_count}</p>
          {showBody && <p>{article.body}</p>}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;

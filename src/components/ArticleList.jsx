import { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { fetchArticles } from '../../utils/api';
import { Container, Row, Col } from 'react-bootstrap';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  return (
    <Container>
      <Row>
        {articles.map((article) => (
          <Col key={article.article_id} xs={12} sm={6} md={4} lg={3}>
            <ArticleCard article={article} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArticleList;

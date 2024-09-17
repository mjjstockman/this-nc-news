import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../../utils/api';

const ArticleDetail = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles(article_id)
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

  return (
    <div>
      <p>ARTICLE DETAIL</p>
    </div>
  );
};

export default ArticleDetail;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nc-news-1-07mk.onrender.com/api',
});

export const fetchArticles = () => {
  return api
    .get('/articles')
    .then((response) => {
      return response.data.articles;
    })
    .catch((err) => {
      console.error('Error fetching items:', err);
      throw err;
    });
};

export const fetchArticleById = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.error(`Error fetching article with ID ${article_id}:`, err);
      throw err;
    });
};

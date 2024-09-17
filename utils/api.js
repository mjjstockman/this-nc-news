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

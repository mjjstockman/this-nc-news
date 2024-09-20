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

export const fetchCommentsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((err) => {
      console.error(
        `Error fetching comments for article ID ${article_id}:`,
        err
      );
      throw err;
    });
};

export const patchArticleById = (article_id, inc_votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.error(`Error updating votes for article ID ${article_id}:`, err);
      throw err;
    });
};

export const postCommentByArticleId = (article_id, comment) => {
  return api
    .post(`/articles/${article_id}/comments`, comment)
    .then((response) => {
      return response.data.comment;
    })
    .catch((err) => {
      console.error(`Error posting comment for article ID ${article_id}:`, err);
      throw err;
    });
};

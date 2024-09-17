import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/articles/:article_id' element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

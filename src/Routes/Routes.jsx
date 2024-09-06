import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';  // Pastikan path sesuai dengan struktur projectmu
import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile';
import Settings from '../Pages/Settings';
import ArticleFeed from '../Pages/ArticleFeed'; // Update with your actual ArticleFeeds component
import AddArticle from '../Components/Article/AddArticle';
import EditArticle from '../Components/Article/EditArticle';
import DetailArticle from '../Components/Article/DetailArticle';

function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } 
        />
        <Route 
          path="/article-feed" 
          element={
            <MainLayout>
              <ArticleFeed />
            </MainLayout>
          } 
        />
        <Route 
          path="/add" 
          element={
            <MainLayout>
              <AddArticle />
            </MainLayout>
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <MainLayout>
              <EditArticle />
            </MainLayout>
          } 
        />
        <Route 
          path="/detail/:id" 
          element={
            <MainLayout>
              <DetailArticle />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default RouterApp;

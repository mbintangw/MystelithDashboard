import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';  // Pastikan path sesuai dengan struktur projectmu
import Profile from '../Pages/Profile';
import Settings from '../Pages/Settings';
import ArticleFeed from '../Pages/ArticleFeed'; // Update with your actual ArticleFeeds component
import AddArticle from '../Components/Article/AddArticle';
import EditArticle from '../Components/Article/EditArticle';
import DetailArticle from '../Components/Article/DetailArticle';

import Login from '../Components/Profile/Login';
import Register from '../Components/Profile/Register';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegister from '../Pages/LoginRegister';

function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/settings" 
          element={
            <MainLayout>
              <Settings />
            </MainLayout>
          } 
        />
        <Route 
          path="/" 
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
        <Route
          path = "/login"
          element = {
            <MainLayout>
              <Login />
            </MainLayout>
          } 
        />
        <Route
          path = "/register"
          element = {
            <MainLayout>
              <Register />
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

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default RouterApp;

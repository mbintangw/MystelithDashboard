import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout"; // Pastikan path sesuai dengan struktur projectmu
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";
import ArticleFeed from "../Pages/ArticleFeed"; // Update with your actual ArticleFeeds component
import AddArticle from "../Components/Article/AddArticle";
import EditArticle from "../Components/Article/EditArticle";
import DetailArticle from "../Components/Article/DetailArticle";

import Login from "../Components/Profile/Login";
import Register from "../Components/Profile/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginRegister from "../Pages/LoginRegister";

import { UserAuthContextProvider } from "../Context/UserAuthContext";
import ProtectedRoute from "../Routes/ProtectedRoute";

function RouterApp() {
  return (
    <Router>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ArticleFeed />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <AddArticle />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <EditArticle />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DetailArticle />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </UserAuthContextProvider>
    </Router>
  );
}

export default RouterApp;

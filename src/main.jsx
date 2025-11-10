import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import BookDetail from "./pages/BookDetail.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import GenreResults from "./pages/GenreResults.jsx";
import AdminTools from "./pages/AdminTools.jsx";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Explore />} />
            <Route path="books/:id" element={<BookDetail />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="adminTools" element={<AdminTools />} />
            <Route path="*" element={<NotFound />} />
            <Route path="genre" element={<GenreResults />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

import React from 'react';
// import logo from './logo.svg';
import './App.css';

// Needed for react router
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import { ToastContainer } from 'react-toastify'

// Component imports
import Nav from '../src/components/nav/index.js';
// import Footer from '../src/components/footer/index.js';

// Page imports
import InfoPage from './pages/Info';
import DashboardPage from '../src/pages/Dashboard';
import SignupPage from '../src/pages/Signup';
import LoginPage from '../src/pages/Login';
import ProfilePage from '../src/pages/Profile';
import NotFound from '../src/pages/404Page';
import Forms from '../src/pages/Form';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* The Navbar is added here to be added to every page that renders */}
        <Nav />
        <main>
          {/* Routing to render different pages when needed */}
          <Routes>
            <Route
              path="/"
              element={<DashboardPage />}
            />
            <Route
              path="/info"
              element={<InfoPage />}
            />
            <Route
              path="/signup"
              element={<SignupPage />}
            />
            <Route
              path="/logforms"
              element={<Forms />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/profile/:userId"
              element={<ProfilePage />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

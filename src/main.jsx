import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Layout/Home.jsx';
import Login from './pages/Login.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import Register from './pages/Register.jsx';
import HomePage from './pages/HomePage.jsx'
import Issues from './pages/Issues.jsx';
import MyIssues from './pages/MyIssues.jsx';
import MyContribution from './pages/MyContribution.jsx';
import AddIssues from './pages/AddIssues.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'issues',
        element: <Issues />,
      },
      {
        path: 'my-issues',
        element: <MyIssues />,
      },
      {
        path: 'my-contributions',
        element: <MyContribution />,
      },
      {
        path: 'add-issues',
        element: <AddIssues />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

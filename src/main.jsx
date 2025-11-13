import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Layout/Home.jsx';
import { API_BASE } from './lib/apiBase';
import Login from './pages/Login.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import Register from './pages/Register.jsx';
import HomePage from './pages/HomePage.jsx'
import Issues from './pages/Issues.jsx';
import MyIssues from './pages/MyIssues.jsx';
import MyContribution from './pages/MyContribution.jsx';
import AddIssues from './pages/AddIssues.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx'
import IssuesDetail from './pages/IssuesDetail.jsx'
import Error from './pages/Error.jsx'

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
        element: <PrivateRoute><MyIssues /></PrivateRoute>,
      },
      {
        path: 'my-contributions',
        element: <PrivateRoute><MyContribution /></PrivateRoute>,
      },
      {
        path: 'add-issues',
        element: <PrivateRoute><AddIssues /></PrivateRoute>,
      },
      {
        path: 'issues/:id',
        loader: ({ params }) => fetch(`${API_BASE}/issues/${params.id}`),
        element: <PrivateRoute><IssuesDetail /></PrivateRoute>,
      }
    ],
  },
  {
    path: '*',
    element: <Error />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

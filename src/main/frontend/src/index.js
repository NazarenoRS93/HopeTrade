import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import HomePage from "./containers/HomePage";
import PostListPage from "./containers/PostListPage";
import LoginAdminPage from "./containers/LoginAdminPage";
import TestPage from "./containers/TestPage";
import axios from "axios";

const router = createBrowserRouter(
    [
        {
            path: "",
            element: <App/>,
            children: [
                {
                    path: "/login",
                    element: <LoginPage/>
                },
                {
                    path: "/logAdmin",
                    element: <LoginAdminPage/>
                },
                {
                    path: "/register",
                    element: <SignUpPage/>
                },
                {
                    path: "/home",
                    element: <HomePage/>
                },
                {
                    path: "/posts",
                    element: <PostListPage/>
                },
                {
                    path: "/test",
                    element: <TestPage/>
                },
            ]
        },
    ],
    {
        basename: "/app"
    });

axios.defaults.baseURL="http://localhost:8080";
axios.interceptors.response.use(response => {
    return response.headers['content-type'] === 'application/json' ? response : Promise.reject(response);
}, error => Promise.reject(error));

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();

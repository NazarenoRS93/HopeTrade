import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import HomePage from "./containers/HomePage";
import PostListPage from "./containers/PostListPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "register",
                element: <SignUpPage/>
            },
            {
                path: "home",
                element: <HomePage/>
            },
            {
                path: "posts",
                element: <PostListPage/>
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

reportWebVitals();

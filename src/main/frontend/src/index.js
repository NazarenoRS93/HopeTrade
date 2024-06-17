import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from "./containers/LoginPage";
import SignUpPage from "./containers/SignUpPage";
import HomePage from "./containers/HomePage";
import LoginAdminPage from "./containers/LoginAdminPage";
import AddOfertaPage from "./containers/AddOfertaPage";
import TestPage from "./containers/TestPage";
import axios from "axios";
import PostListPage from "./containers/PostListPage";
import AddPostPage from "./containers/AddPostPage";
import EditPostPage from "./containers/EditPostPage";
import SelectFilialPage from "./containers/SelectFilialPage";
import EditProfilePage from "./containers/EditProfilePage";
import EditProfilePageAyudante from "./containers/EditProfilePageAyudante";
import ChangePasswordPage from "./containers/ChangePasswordPage";
import InspectPostPage from "./containers/InspectPostPage";
import Exchange from "./containers/ExchangePage";
import ExchangeListPage from "./containers/ExchangeListPage";
import ProfilePage from "./containers/ProfilePage";
import AdministradorProfilePage from "./containers/AdministradorProfilePage";
import SystemAdminsPage from "./containers/SystemAdminsPage";
import SystemUsersListPage from "./containers/SystemUsersListPage";

const router = createBrowserRouter(
	[
		{
			path: "",
			element: <App />,
			children: [
				{
					path: "/login",
					element: <LoginPage />
				},
				{
					path: "/logAdmin",
					element: <LoginAdminPage />
				},
				{
					path: "/register",
					element: <SignUpPage />
				},
				{
					path: "/home",
					element: <HomePage />
				},
				{
					path: "/posts",
					element: <PostListPage />
				},
				{
					path: "/my-posts",
					element: <PostListPage />
				},
				{
					path: "/add-post",
					element: <AddPostPage />
				},
				{
					path: "/edit-post",
					element: <EditPostPage />
				},
				{
					path: "/add-oferta",
					element: <AddOfertaPage />
				},
				{
					path: "/inspect-post/:id",
					element: <InspectPostPage />
				},
				{
					path: "/exchange/:id",
					element: <Exchange />
				},
				{
					path: "/exchanges",
					element: <ExchangeListPage />
				},
				{
					path: "/test",
					element: <TestPage />
				},
				{
					path: "/select-filial",
					element: <SelectFilialPage />
				},
				{
					path: "/profile",
					element: <EditProfilePage />
				},
				{
					path: "/administrador-profile",
					element: <EditProfilePageAyudante />
				},
				{
					path: "/cambiarContrasenia",
					element: <ChangePasswordPage />
				},
				{
					path: "/verperfil",
					element: <ProfilePage />
				},
				{
					path: "/verperfiladministrativo",
					element: <AdministradorProfilePage />
				},
				{
					path: "/adminusers",
					element: <SystemAdminsPage />
				},
				{
					path: "/usersystem",
					element: <SystemUsersListPage />
				},
			]
		},
	],
	{
		basename: "/app"
	});

axios.defaults.baseURL = "http://localhost:8080";
axios.interceptors.response.use(response => {
	return response.headers['content-type'] === 'application/json' ? response : Promise.reject(response);
}, error => Promise.reject(error));

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();

import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import { PersonProfilePage } from "./pages/PersonProfilePage";
import { PostDetailsPage } from "./pages/PostDetailsPage";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";
import AppShell from "./components/AppShell";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import ErrorPage from "./pages/ErrorPage";
import EditPost from "./pages/EditPost";
import LogoutPage from "./pages/LogoutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppShell />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "post/:postId", element: <PostDetailsPage /> },
            { path: "create-post", element: <CreatePostPage /> },
            { path: "likes", element: <HomePage /> },
            { path: "profile/:userId", element: <PersonProfilePage /> },
            { path: "settings", element: <ProfileSettingsPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "edit-post/:postId", element: <EditPost /> },
        ],
        errorElement: <ErrorPage />,
    },
    {
        path: "logout",
        element: <LogoutPage />,
    },
]);

export default router;

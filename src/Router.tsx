import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import { PersonProfilePage } from "./pages/PersonProfilePage";
import { PostDetailsPage } from "./pages/PostDetailsPage";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";
import AppShell from "./components/AppShell";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppShell />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "explore", element: <PostDetailsPage /> },
            { path: "create-post", element: <CreatePostPage /> },
            { path: "likes", element: <HomePage /> },
            { path: "profile", element: <PersonProfilePage /> },
            { path: "settings", element: <ProfileSettingsPage /> },
        ],
    },
]);

export default router;

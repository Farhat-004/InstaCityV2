export const fetchPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`);
    const data = await response.json();
    return data;
};

export const fetchPosts = async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/?page=${page}&limit=${limit}`);
    const data = await response.json();

    return {
        ...data,
        posts: data.posts?.slice((page - 1) * limit, page * limit) ?? [],
    };
};
export const fetchCurrentUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/me`);
    const data = await response.json();
    return data;
};

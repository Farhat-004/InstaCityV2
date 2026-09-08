import { toast } from "react-toastify";

const useToasts = () => {
    const showLoginSuccessToast = () => {
        toast("Login successful!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    return { showLoginSuccessToast };
};

export default useToasts;

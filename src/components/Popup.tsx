import { toast } from "react-toastify";

const Popup = ({ message }: { message: string }) => {
    return toast(message, {
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

export default Popup;

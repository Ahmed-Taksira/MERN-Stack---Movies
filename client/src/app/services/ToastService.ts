import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const success = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const error = () => {
  toast.error("Something went wrong", {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const ToastService = {
  success,
  error,
};

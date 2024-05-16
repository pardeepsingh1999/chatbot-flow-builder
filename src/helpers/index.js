import { toast } from "react-toastify";

let id = 2;

export const getNodeId = (type = "") => `${id++}`;

export const showToast = (message = "Server error!", type = "error") => {
  toast[type](message);
};

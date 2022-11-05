import axios from "axios";

// const accessToken = localStorage.getItem("accessToken");
const AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

// if(accessToken){
//     AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
// };

export default AxiosInstance
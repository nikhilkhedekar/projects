import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../axiosinstance";
import { AdminAuthContext } from "../context/AdminAuthContext"
import jwtDecode from "jwt-decode";

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const decodedToken = jwtDecode(accessToken);
        console.log("decodedToken", decodedToken);
        if(accessToken){
            AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;            
            setAdmin(decodedToken.user);
            setIsLoggedIn(true);
            navigate("/")
        }else navigate("/login");        
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await AxiosInstance.post("/api/v1/auth/login", {
                email, password
            });
            console.log("admin", data);
            localStorage.setItem("accessToken", data?.tokens?.accessToken);
            if (data?.user?.role == "admin") {
                setAdmin(data?.user);
                setIsLoggedIn(true);
            }
            navigate("/");
        } catch (error) {
            console.log("Login Error", error);
        }
    }

    const logout = async () => {
        try{
            const { data } = await AxiosInstance.delete("/api/v1/auth/logout");
            console.log("logoutMsg", data);
            localStorage.removeItem("accessToken");
            setAdmin({});
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.log("Logout Error", error);
        }
    }

    return (
        <AdminAuthContext.Provider value={{
            admin,
            isLoggedIn,
            login,
            logout
        }}>
            {children}
        </AdminAuthContext.Provider>
    )
}
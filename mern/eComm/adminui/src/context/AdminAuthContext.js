import { createContext } from "react"

export const AdminAuthContext = createContext({
    admin: {},
    isLoggedIn: false,
    login: (email, password) => {},
    logout: () => {}
});
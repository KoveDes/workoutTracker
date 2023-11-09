import {createContext, useState} from "react";

const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [auth, setAuth] = useState({});
    const [user, setUser] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist') || false)
    )

    return (
        <AuthContext.Provider value={{auth, user,setUser, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
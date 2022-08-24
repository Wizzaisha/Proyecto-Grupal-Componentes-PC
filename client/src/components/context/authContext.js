/* Creating a context and a provider. */
import { createContext, useContext } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from "../../firebase/firebaseConfig";

export const authContext = createContext();

/*
UseAuth() is a function that returns the context object from the authContext object.
 */
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("ther is not auth provider");
    return context;
};
export function AuthProvider({ children }) {
    const register = (email,password) => {
        createUserWithEmailAndPassword(auth ,email,password)
    }
    return (
        <authContext.Provider value={{ register }}>{children}</authContext.Provider>
    );
}

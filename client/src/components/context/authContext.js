/* Creating a context and a provider. */
import { auth } from "../../firebase/firebaseConfig";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword ,
    onAuthStateChanged ,
    signOut
} from "firebase/auth"

export const authContext = createContext();

/*
UseAuth() is a function that returns the context object from the authContext object.
UseAuth.login
UseAuth.SingUp
UseAuth.User
 */
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("ther is not auth provider");
    return context;
};
export function AuthProvider({ children }) {
    const [user, setUser] = useState(false)
    //crea un usuario en la tabla de firabase
    const register = async (email,password) => {
        await createUserWithEmailAndPassword(auth ,email,password)
    }
    // loguea un usuario existente
    const login = async (email,password) => {
        await signInWithEmailAndPassword(auth,email,password)
    }
    // cierra la sesion actual
    const logout = async () =>{
        await signOut(auth)
    }
    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth , currentUser =>{
            setUser(currentUser)
        })
        return () => unsuscribe();
    },[])
    return (
        <authContext.Provider value={{ register , login , user ,logout}}>{children}</authContext.Provider>
    );
}

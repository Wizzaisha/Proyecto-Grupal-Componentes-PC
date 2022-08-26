/* Creating a context and a provider. */
import { auth, db } from "../../firebase/firebaseConfig";
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
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import {
    doc ,
    setDoc,
    getDoc,
} from "firebase/firestore"

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
    const [admin , setAdmin] = useState(false)
    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth , (currentUser) =>{
            setUser(currentUser)
        })
        return () => unsuscribe();
    },[])
    //crea un usuario en la tabla de firabase
    const register = async (email,password,admin = false) => {
        const userCredentials = await createUserWithEmailAndPassword(auth ,email,password)
        .then((userData)=>{
            return userData
        });
        const docRef = doc(db , `user/${userCredentials.user.uid}`)
        setDoc(docRef,{
            email : email,
            password : password,
            admin : admin
        })
    }
    const getRole = async (uid) =>{
        const docRef = doc(db , `user/${uid}`)
        const userDb = await getDoc(docRef)
        const data = userDb.data()
        setAdmin(data.admin)
    }
    // loguea un usuario existente
    const login = async (email,password) => {
        await signInWithEmailAndPassword(auth,email,password)
        .then((userData)=>{
            getRole(userData.user.uid)
        });
    }
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        googleProvider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        return signInWithPopup(auth, googleProvider)
    }
    // cierra la sesion actual
    const logout = async () =>{
        await signOut(auth)
        setAdmin(false)
    }
    return (
        <authContext.Provider value={{ register , login , user ,admin ,logout , loginWithGoogle}}>{children}</authContext.Provider>
    );
}

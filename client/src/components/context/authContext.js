/* Creating a context and a provider. */
import { auth, db } from "../../firebase/firebaseConfig";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from "firebase/auth"
import {
    doc,
    setDoc,
    getDoc,
    arrayUnion,
    arrayRemove,
    updateDoc,
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
    const [user, setUser] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [favorite, setFavorite] = useState('')
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsuscribe()
    }, [])
    //crea un usuario en la tabla de firabase

    const register = async (username,email,password,admin = false) => {
        const userCredentials = await createUserWithEmailAndPassword(auth ,email,password)
        const docRef = doc(db, `user/${userCredentials.user.uid}`)
        localStorage.setItem("username", username)
        setDoc(docRef, {
            userName : username,
            email: email,
            password: password,
            admin: admin,
            favorites: []
        })
    }
    const getRole = async (uid) => {
        const docRef = doc(db, `user/${uid}`)
        const userDb = await getDoc(docRef)
        const data = userDb.data()
        localStorage.setItem("username", data.userName)
        localStorage.setItem("email", data.email)
            if(data.admin === true){
                localStorage.setItem("admin" , "true" )
                setAdmin(true)
            }else{
                localStorage.setItem("admin", "false")
                setAdmin(false)
            }
    }
    // loguea un usuario existente
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userData) => {
                console.log(userData)
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
    //reset password
    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email)
    }
    // cierra la sesion actual
    const logout = async () => {
        await signOut(auth)
        setAdmin(false)
        localStorage.removeItem("admin")
    }
    // Agrega el atributo favorites al usuario
    const addFavorite = async (id) => {
        const docRef = doc(db, `user/${user.uid}`)
        await updateDoc(docRef, {
            favorite: arrayUnion(id)
        })
    }

    const removeFavorite = async (id) => {
        const docRef = doc(db, `user/${user.uid}`)
        await updateDoc(docRef, {
            favorite: arrayRemove(id)
        })
    }

    const getFavorite = async () => {
        const docRef = doc(db, `user/${user.uid}`)
        const userDb = await getDoc(docRef)
        const data = userDb.data()
        setFavorite(data.favorite)
        return(favorite);
    }
    const addAndRemoveAdmin = async (uid, admin) => {
        const docRef = doc(db, `user/${uid}`)
        setDoc(docRef, { admin : admin }, { merge: true });
    }


    return (
        <authContext.Provider value={{ register, login, user, admin, logout, loginWithGoogle, addFavorite, removeFavorite, getFavorite, resetPassword, favorite ,addAndRemoveAdmin }}>{children}</authContext.Provider>
    );
}
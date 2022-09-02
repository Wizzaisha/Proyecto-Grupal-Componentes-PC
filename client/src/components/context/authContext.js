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
<<<<<<< HEAD
    updateDoc,
    arrayUnion,
    arrayRemove
=======
    arrayUnion,
    arrayRemove,
    updateDoc
>>>>>>> a14b9b2e7c2b6e66161fbaba047f83828ed1be24
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
    const [favorite, setFavorite] = useState('')
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsuscribe()
    }, [])
    //crea un usuario en la tabla de firabase
    const register = async (email, password, admin = false) => {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            .then((userData) => {
                return userData
            });
        const docRef = doc(db, `user/${userCredentials.user.uid}`)
        setDoc(docRef, {
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
        if (data.admin === true) {
            localStorage.setItem("admin", "true")
        } else {
            localStorage.setItem("admin", "false")
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
        console.log(favorite);
    }
    return (
        <authContext.Provider value={{ register, login, user, logout, loginWithGoogle, addFavorite, removeFavorite, getFavorite }}>{children}</authContext.Provider>
    );
}

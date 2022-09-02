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
    signInWithPopup
} from "firebase/auth"
import {
    doc,
    setDoc,
    getDoc,
    arrayUnion,
    arrayRemove,
    updateDoc
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
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => unsuscribe();
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
    // cierra la sesion actual
    const logout = async () => {
        await signOut(auth)
        localStorage.removeItem("admin")
    }
    // Agrega el atributo favorites al usuario
    const addFavorite = async (id) => {
        const docRef = doc(db, `user/${user.uid}`)
        updateDoc(docRef, {
            favorite: arrayUnion(id)
        })
    }

    const removeFavorite = async (id) => {
        const docRef = doc(db, `user/${user.uid}`)
        updateDoc(docRef, {
            favorite: arrayRemove(id)
        })
    }



    return (
        <authContext.Provider value={{ register, login, user, logout, loginWithGoogle, addFavorite, removeFavorite }}>{children}</authContext.Provider>
    );
}

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function ProtectedRouter({children}){
    const auth = useAuth();

    if(!auth.user.email) return <Navigate to={"/login"}/>
    return <>{children} </>
}
//ruta protegida por componente
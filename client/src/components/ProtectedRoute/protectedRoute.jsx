import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function ProtectedRouter({children}){
    const auth = useAuth();
    if(!auth.admin) return <Navigate to={"/signup"}/>
    return <>{children} </>
}
//ruta protegida por componenteA
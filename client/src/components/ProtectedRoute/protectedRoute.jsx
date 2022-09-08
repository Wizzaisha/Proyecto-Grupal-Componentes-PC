import { Navigate } from "react-router-dom";


export function ProtectedRouter({children}){
    if(!localStorage.getItem("admin")=== "true") return <Navigate to={"/signup"}/>
    return <>{children} </>
}
//ruta protegida por componenteA
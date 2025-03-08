import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth, AuthData } from "../providers/authProviders"
import { User } from "../models/user"
import { AuthService } from "../services/authService"

const Authmiddleware = (props: any) => {
    const [user, setUser] = useAuth() as AuthData
    const [isLoading, setIsloading] = useState<boolean>(true)
    const token = localStorage.getItem("token")
    const [isErr, setIsErr] = useState<boolean>(false)
  
    useEffect(() => {
      AuthService.getMe()
        .then((res: { success: any; data: User }) => {  
          if (res.success) {
            setUser(res.data)
            setIsErr(false)
          } else {
            setIsErr(true)
          }
          setIsloading(false)
        })
        .catch((error: any) => {
          setIsloading(false)
        })
    }, [])
  
    if(!token) {
      return <Navigate to={{ pathname: "/sign-in" }}  replace />
    } else {
      if (!isLoading) {
        if (user?.role === props.allowed) {
          return <Outlet />
        } else {
          return <Navigate to={{ pathname: "/not-found" }} replace />
        }
      } else {
        return <div className="d-flex justify-content-center align-items-center " style={{ height: "500px" }}>
      </div>
      }
    }
  }
  
  export default Authmiddleware
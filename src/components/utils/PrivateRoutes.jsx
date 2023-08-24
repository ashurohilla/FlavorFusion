import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoutes = () => {
    let user = localStorage.getItem("user")
    return (
      user ? <Outlet/> : <Navigate to ="/login"/>
    )};

export default PrivateRoutes;
import { jwtDecode } from "jwt-decode";
import Spinner from "./Spinner";
import { Navigate, useLocation } from "react-router-dom";
import api from "@/api";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {

    // this is going to give access to create post if we're login.
    const [isAuthorized, setIsAuthorized] = useState(null);
    const toastShown = useRef(false);   // a flag to fire toast for once.
    const location = useLocation();     // get the current path we're on.

    useEffect(() => {
        authorize().catch(() => setIsAuthorized(false));
    }, []);

    async function refreshToken() {
        
        const refresh = localStorage.getItem("refresh");

        try {
            const response = await api.post("token_refresh/", {refresh:refresh});
            if (response.status == 200){
                localStorage.setItem("access", response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }

        } catch (error) {
            setIsAuthorized(false);
            console.log(error);
        }

    }

    async function authorize(){
        // if local storage has a key called access or not
        const token = localStorage.getItem("access");
        
        // if access key not exists, means user is not logged in.
        if(!token) {
            if(!toastShown.current){
                toast.warn("You have to login first!")
                toastShown.current = true;
            }
            setIsAuthorized(false);
            return;
        }
        
        // Token ko decode karke check karo ki woh expire hua hai ya nahi.
        // Agar expire ho gaya hai → refresh token lo.
        // Agar valid hai → user ko authorized mark karo.
        // Agar token hi galat nikla → unauthorized.


        // if exists, then we decode the token
        const decodeToken = jwtDecode(token);
        const expiry_data = decodeToken.exp;    // Token expire kab hoga, uska Unix timestamp (in seconds).
        const current_time = Date.now()/1000;   // Date.now() → current time in milliseconds, / 1000 kar diya taaki seconds mein aa jaaye (same as exp).

        if(current_time > expiry_data) {
            // means token is expired then we need to generate new token.
            await refreshToken();
        }
        else{
            // token is not expired.
            setIsAuthorized(true);
        }

    }

    if(isAuthorized === null) {
        return <Spinner />
    }

    return (
        <>
            {/* if user is not authrized sending user to loginPage, if authrized then accessing the children prop */}
            {isAuthorized ? children : <Navigate to="/signin" state={{from:location}} replace />}
            
        </>
    )
}

export default ProtectedRoute
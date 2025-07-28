import axios from "axios";
import { jwtDecode } from "jwt-decode";

// when working on development enviornment use local url, for production using live url.
export const BASE_URL = import.meta.env.VITE_BASE_URL;

// main axios instance (ye sab jagah use hoga)
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// another axios instance without any interceptors, Yeh sirf token refresh ke liye use h — loop se bachne ke liye
const plainAxios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Interceptor: Before every request, check token status
api.interceptors.request.use(
    async (config) => {

        // If the request is for token_refresh, skip the check (warna infinite loop ho jaayega)
        if (config.url.includes("token_refresh")) {
            return config;
        }

        // Access token uthao localStorage se
        let token = localStorage.getItem("access");

        // Agar token h to uska expiry time check karo
        if (token) {
            try {
                // Token ko decode, aur uska expiry time 
                const decoded = jwtDecode(token);
                const expiry_date = decoded.exp;              // Token expire hone ka time (in seconds)
                const current_time = Date.now() / 1000;       // Abhi ka time (in seconds)

                // Agar token expire ho gaya hai to refresh karo
                if (expiry_date < current_time) {
                    const refresh = localStorage.getItem("refresh");

                    // Refresh token bhi mila to use bhejo refresh ke liye
                    if (refresh) {
                        try {
                            const res = await plainAxios.post("token_refresh/", { refresh });

                            // Access token update karo localStorage me
                            const newAccessToken = res.data.access;
                            localStorage.setItem("access", newAccessToken);

                            // Ab naya token use karo request ke liye
                            token = newAccessToken;

                        } catch (error) {
                            // Refresh token bhi expire/invalid ho gaya → logout user
                            console.log("Refresh failed");

                            localStorage.removeItem("access");
                            localStorage.removeItem("refresh");
                            window.location.href = "/signin";  // Redirect to login page

                            return config;
                        }

                    } else {
                        // Refresh token localStorage me mila hi nahi
                        console.log("No refresh token found.");

                        localStorage.removeItem("access");
                        window.location.href = "/signin";
                        return config;
                    }
                }

                // Valid token mil gaya → use Authorization header me bhejo
                config.headers.Authorization = `Bearer ${token}`;

            } catch (err) {
                // Agar token decode me koi dikkat aayi
                console.log("JWT decode failed or refresh failed:", err);
            }
        }

        // Token check done → request continue karo
        return config;
    },

    // Agar request intercept karte waqt error aaya, reject the request
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

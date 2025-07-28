// writing all the functions to fetch our API

import api from "@/api"

// fn to fetch our blogs
export async function getBlogs(page) {
    try {
        const response = await api.get(`blog_list?page=${page}`);   // blog list is the endpoint from where we're fetching all blogs.
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// fn to get particular blog detail
export async function getBlog(slug) {
    try {
        const response = await api.get(`blogs/${slug}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// fn to register particular user
export async function registerUser(data) {
    try {
        const response = await api.post("register_user/", data); // sending res at this endpoint with the form-data
        return response.data
    } catch (error) {
        // error at backend side must be that if the username exists already, other errors are handled already at frontend.
        console.log(error);

        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error(error);
    }
}

// fn for accessing token
export async function signin(data) {
    // remember this data is coming from the mutation fn in loginpage
    try {
        const response = await api.post("token/", data);
        return response.data;
    } catch (error) {
        if (error.status === 401) {
            throw new Error("Invalid credentials")
        }
        else {
            throw new Error(error);
        }
    }
}

// fn to refresh token automatically
export async function refrreshAccessToken() {
    try {
        const refresh = localStorage.getItem("refresh");

        if (refresh) {
            const response = await api.post("token_refresh/", { refresh });

            if (response.status === 200) {
                const newAccessToken = response.data.access;
                localStorage.setItem("access", newAccessToken);
                return newAccessToken;
            }
            else {
                throw new Error("Failed to refresh token");
            }
        } else {
            throw new Error("No refresh token available");
        }
    } catch (error) {
        console.log("Error refreshing token:", error);

        // if refresh fail, then clear the tokens to logout user.
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return null;

    }
}

// fn to display/get username.
export async function getUsername() {
    try {
        const response = await api.get("get_username/");
        return response.data
    } catch (error) {
        throw new Error(error.message);
    }
}

// fn to create post.
export async function createBlog(data) {
    try {
        const response = await api.post("create_blog/", data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

// update blog
export async function updateBlog(data, id) {
    try {
        const response = await api.put(`update_blog/${id}/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response?.data.message || "Failed to update blog");
        }
        throw new Error(error.message);
    }
}

// delete blog
export async function deleteBlog(id) {
    try {
        const response = await api.delete(`delete_blog/${id}/`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response?.data.message || "Failed to delete blog");
        }
        throw new Error(error.message);
    }
}

// get user info fn
export async function getUserInfo(username) {
    try {
        const response = await api.get(`get_userinfo/${username}/`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response?.data.message || "Failed to get user info!");
        }
        throw new Error(error.message);
    }
}

// fn to update user profile
export async function updateUserProfile(data) {
    // console.log("data going to API - ", data);

    try {
        const response = await api.put(`update_user_profile/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response?.data.username[0] || "Failed to update user profile!!");
        }
        throw new Error(error.message);
    }
}


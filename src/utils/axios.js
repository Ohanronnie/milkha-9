import axios from "axios";

// Create the instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: getAuthHeaders(), // use a function to always get latest token
});

// Helper to always grab the latest access token
function getAuthHeaders() {
  const access_token = localStorage.getItem("access_token");
  return access_token
    ? {
        Authorization: `Bearer ${access_token}`,
      }
    : {};
}

// Flag to avoid infinite retry loops
let isRefreshing = false;

axiosInstance.interceptors.request.use((config) => {
  //console.log("axios config",config)
  if(!config.url.split("?")[1] && !config.url.endsWith("/")){
    config.url = config.url + "/"
  }
  config.headers = {
    ...config.headers,
    ...getAuthHeaders(), // ensure token is fresh every request
  };
  return config;
});

// Response interceptor to handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const response = error.response;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refresh_token");
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/token/refresh/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const newAccessToken = res.data.access_token;
          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("refresh_token", res.data.refresh_token);

          // update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // important: reset refresh flag
          isRefreshing = false;

          return axiosInstance(originalRequest); // retry the failed request
        } catch (refreshError) {
          isRefreshing = false;
          // Refresh also failed, redirect to login
          window.location.href = "/login";
          return Promise.reject(
            new Error("Session expired. Please login again.")
          );
        }
      }
    }

    return Promise.reject(error);
  }
);

import axios from "axios";
import React, { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          logOut()
            .then(() => navigate("/login"))
            .catch((err) => console.log(err));
        }

        if (error.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Status: 404",
            text: "Are you trying to access forbidden data!",
            timer: 1500,
            toast: true,
            showConfirmButton: false,
          });
          navigate("/");
        }
        return Promise.reject(error);
      }
    );

    () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);
      axiosSecure.interceptors.response.eject(resInterceptors);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;

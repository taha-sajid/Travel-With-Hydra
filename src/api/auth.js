import httpService from "./httpService";

export const loginApi = (Credentials) => {
  console.log("userInfo", Credentials);
  
  return httpService.post("/auth/login/", Credentials);
};

export const registerApi = (userInfo) => {
  console.log("RegisterAPI", userInfo, "RegisterAPI");
  return httpService.post("/auth/registration/", userInfo);   
};

export const changePasswordApi = ({ passwords, token }) => {
  return httpService.post("/auth/password/change/", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgotPasswordApi = (email) => {
  return httpService.post("/auth/password/reset/", email);
};
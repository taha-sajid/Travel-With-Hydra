import httpService from "./httpService";

export const loginApi = (Credentials) => {
  console.log("userInfo", Credentials);
  
  return httpService.post("/auth/login/", Credentials);
};

export const registerApi = (userInfo) => {
  console.log("RegisterAPI", userInfo, "RegisterAPI");
  return httpService.post("/auth/registration/", userInfo);   
};

export const changePasswordApi = ({ passwords, AuthToken }) => {
  return httpService.post("/auth/password/change/", passwords, {
    headers: {
      Authorization: `Bearer ${AuthToken}`,
    },
  });
};

export const resetPasswordApi = ({ passwords, token, uid }) => {
  debugger;
  return httpService.post("/auth/reset-password-confirm/", {
    uid,
    token,
    new_password1: passwords.new_password1,
    new_password2: passwords.new_password2,
  });
};


export const forgotPasswordApi = (email) => {
  return httpService.post("/auth/password/reset/", email);
};
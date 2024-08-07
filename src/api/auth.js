import httpService from "./httpService";

export const loginApi = (Credentials) => {
  console.log("userInfo", Credentials);

  return httpService.post("/auth/login/", Credentials);
};

export const registerApi = (userInfo) => {
  console.log("RegisterAPI", userInfo, "RegisterAPI");
  return httpService.post("/auth/registration/", userInfo);
};

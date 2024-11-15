import { useSelector } from "react-redux";
import httpService from "./httpService";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAuthToken } from "./customHooks";

export const getCitizenshipData = (citizenshipCountry) => {
  return httpService.get(`/visa/citizenship-country/${citizenshipCountry}/`);
};

export const getCountryData = (country) => {
  return httpService.get(`/visa/country/${country}/`);
};

export const getAllCountryData = () => {
  return httpService.get(`/visa/country/`);
};

export const getResidentData = (residentCountry) => {
  return httpService.get(`/visa/resident-country/${residentCountry}/`);
};

export const getCitizenshipCountries = () => {
  return httpService.get(`/visa/citizenship-country`);
};

export const getResidentCountries = () => {
  return httpService.get(`/visa/resident-country`);
};

export const submitVisaApplicationFormApi = (visaFormInfo, token) => {
  console.log("visaFormInfo and token from visa.js", visaFormInfo, token);

  return httpService.post(`/visa/submit-application-form/`, visaFormInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyApplications = (token) => {
  return httpService.get(`/visa/my-applications/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyWishlist = (token) => {

  return httpService.get(`/visa/wishlist/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addToWishlist = (token, name) => {
  return httpService.post(`/visa/wishlist/`, { country:name }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
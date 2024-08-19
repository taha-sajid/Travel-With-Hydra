import httpService from "./httpService";

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

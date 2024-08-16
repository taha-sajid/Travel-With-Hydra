import httpService from "./httpService";

export const getCitizenshipData = (citizenshipCountry) => {
  return httpService.get(`/visa/citizenship-country/${citizenshipCountry}`);
};

export const getCountryData = (country) => {
  return httpService.get(`/visa/country/${country}/`);
};

export const getResidentData = (residentCountry) => {
  return httpService.get(`/visa/resident-country/${residentCountry}`);
};

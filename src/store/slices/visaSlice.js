import { createSlice } from "@reduxjs/toolkit";

const visaSlice = createSlice({
  name: "visa",
  initialState: {
    country_name: null,
    visa_type: null,
    user: null, 
    applicantsCount: null,
    totalPrice: null,
    generateUUID: null,
  },
  reducers: {
    setCountryName: (state, action) => {
      state.country_name = action.payload;
    },
    setVisaType: (state, action) => {
      state.visa_type = action.payload;
    },
    setVisaUser: (state, action) => {
      state.user = action.payload; 
    },
    setApplicantsCount: (state, action) => {
      state.applicantsCount = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setUUID : (state, action) => {
      state.generateUUID = action.payload;
    },
    clearVisaData: (state) => {
      state.country_name = null;
      state.visa_type = null;
      state.user = null; 
    },
  },
});

export const {
  setCountryName,
  setVisaType,
  setVisaUser,
  setApplicantsCount,
  setTotalPrice,
  setUUID,
  clearVisaData,
} = visaSlice.actions;
export default visaSlice.reducer;

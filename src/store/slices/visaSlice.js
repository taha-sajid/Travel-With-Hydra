import { createSlice } from "@reduxjs/toolkit";

const visaSlice = createSlice({
  name: "visa",
  initialState: {
    country_name: null,
    visa_type: null,
    user: null, 
    applicantsCount: null,
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
  setApplicantsCount  ,
  clearVisaData,
} = visaSlice.actions;
export default visaSlice.reducer;

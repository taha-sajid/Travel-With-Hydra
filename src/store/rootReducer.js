import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import visaReducer from "./slices/visaSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  visa: visaReducer,
});

export default rootReducer;

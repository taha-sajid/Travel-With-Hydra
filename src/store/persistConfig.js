// src/store/persistConfig.js

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // specify which reducers you want to persist
};

export default persistConfig;

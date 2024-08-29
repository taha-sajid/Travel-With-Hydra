import { logout } from "../slices/authSlice"; // Adjust the path to your authSlice

let tokenExpirationTimeout;

export const setTokenExpirationTimeout = (dispatch, exp) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeUntilExpiration = exp - currentTime; // Calculate time until expiration

  if (timeUntilExpiration > 0) {
    tokenExpirationTimeout = setTimeout(() => {
      // Check if dispatch and logout are defined before calling
      if (dispatch && typeof dispatch === "function" && logout) {
        dispatch(logout()); // Automatically log out when token expires
      } else {
        console.error("Dispatch or logout function is undefined.");
      }
    }, timeUntilExpiration * 1000); // Convert to milliseconds
  }
};

export const clearTokenExpirationTimeout = () => {
  if (tokenExpirationTimeout) {
    clearTimeout(tokenExpirationTimeout);
  }
};

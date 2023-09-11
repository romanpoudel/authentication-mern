import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authStatus/authSlice";

export const store = configureStore({
	reducer: {auth:authReducer},
});

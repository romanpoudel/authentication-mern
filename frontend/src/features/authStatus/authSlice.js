import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false };

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authenticate: (state,action) => {
			state.isAuthenticated = action.payload;
		},
		// decrement: (state) => {
		// 	state.value = state.value - 1;
		// },
		// incrementByValue: (state, action) => {
		// 	state.value = state.value + action.payload;
		// },
		// incrementByTypedValue: (state, action) => {
		// 	state.value = state.value + action.payload;
		// },
	},
});

export const { authenticate} = authSlice.actions;

export default authSlice.reducer;

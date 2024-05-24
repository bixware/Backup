import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: {} },
    reducers: {
        login: (state, action) => {
            // return (state, action) => [...state, action.payload];
            state.value = action.payload
        },
        logout: (state, action) => {
            state.value = {}
        }
    }
})
export const { login, logout } = userSlice.actions
export default userSlice.reducer
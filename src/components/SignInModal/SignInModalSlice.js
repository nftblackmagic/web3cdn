import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signInModal: false,
    orderSignData: ""
};

const signInModalReducer = createSlice({
    name: "signInModal",
    initialState,
    reducers: {
        openSignInModal: (state) => {
            console.log("openSignInModal");
            state.signInModal = true
        },
        closeSignInModal: (state) => {
            state.signInModal = false;
        },
        updateOrderSignData: (state, action) => {
            state.orderSignData = action.payload;
        },
    },
});

export const {
    openSignInModal,
    closeSignInModal,
} = signInModalReducer.actions;

export default signInModalReducer.reducer;

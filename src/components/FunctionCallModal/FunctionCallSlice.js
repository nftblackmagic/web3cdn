import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    functionCallModalOpen: false,
    functionCallInfo: {},
};

const functionCallModalSlice = createSlice({
    name: "functionCallModal",
    initialState,
    reducers: {
        openFunctionCallModal: (state, action) => {
            state.functionCallInfo = action.payload;
            state.functionCallModalOpen = true
        },
        closeFunctionCallModal: (state) => {
            state.functionCallModalOpen = false;
        },
    },
});

export const {
    openFunctionCallModal,
    closeFunctionCallModal,
} = functionCallModalSlice.actions;

export default functionCallModalSlice.reducer;

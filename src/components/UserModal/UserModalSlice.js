import { createSlice } from "@reduxjs/toolkit";
import { updateConnectButtonText } from "../../divCheck/connectButtonCheck";
import { isValidAddress } from "../../wallet/utils";
import { formatWalletAddress } from "../../utils";

const initialState = {
    userModalOpen: false,
    walletAddress: "",
    isInitializedContract: false,
    chainId: {},
    provider: {},
    signer: {},
    orderSignData: "",
    readFunction: [],
};

const userModalReducer = createSlice({
    name: "userModal",
    initialState,
    reducers: {
        openUserModal: (state) => {
            state.userModalOpen = true
        },
        closeUserModal: (state) => {
            state.userModalOpen = false;
        },
        updateWalletAddress: (state, action) => {
            state.walletAddress = action.payload
            if (isValidAddress(state.walletAddress)) {
                updateConnectButtonText(formatWalletAddress(state.walletAddress));
            }
            else {
                updateConnectButtonText("Connect Wallet");
            }
        },
        updateChainId: (state, action) => {
            state.chainId = action.payload
        },
        updateProvider: (state, action) => {
            state.provider = action.payload
        },
        updateSigner: (state, action) => {
            state.signer = action.payload
        },
        updateOrderSignData: (state, action) => {
            state.orderSignData = action.payload
        },
        updateReadFunction: (state, action) => {
            state.readFunction = action.payload
        },
        appendReadFunction: (state, action) => {
            state.readFunction.push(action.payload)
        },
        updateIsInitializedContract: (state, action) => {
            state.isInitializedContract = action.payload
        },
    },
});

export const {
    openUserModal,
    closeUserModal,
    updateWalletAddress,
    updateChainId,
    updateProvider,
    updateSigner,
    updateOrderSignData,
    updateReadFunction,
    appendReadFunction,
    updateIsInitializedContract,
} = userModalReducer.actions;

export default userModalReducer.reducer;

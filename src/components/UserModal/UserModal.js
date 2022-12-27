import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useDispatch, useSelector } from "react-redux";
import { closeUserModal, updateChainId, updateIsInitializedContract, updateProvider, updateSigner, updateWalletAddress } from "./UserModalSlice";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

import React, { useEffect } from "react";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import "./UserModal.css";
import "../mint.css";
import { useAccount, useEnsName, useNetwork, useSwitchNetwork, useProvider, useSigner } from "wagmi";
import { formatWalletAddress } from "../../utils";
import { connectWalletInit, getChainIdFromWindow, readViewCall } from "../../wallet/wallet";
import { useSnackbar } from "notistack";
import { ethers } from "ethers";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const theme = createTheme({
    components: {
        // Name of the component
        MuiDialog: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    left: 'auto !important',
                    bottom: 'auto !important',
                },
            },
        },
    },
});


export const UserModal = () => {
    const dispatch = useDispatch();
    const userModalOpen = useSelector(state => state.userModal.userModalOpen);
    const readFunction = useSelector(state => state.userModal.readFunction);
    const isInitializedContract = useSelector(state => state.userModal.isInitializedContract);
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const provider = useProvider();
    const { data: signer } = useSigner()
    const { address, isConnected } = useAccount();
    const { data, isError } = useEnsName({
        address,
    })
    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();

    const user = isError || (!data) ? formatWalletAddress(address) : data;

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        dispatch(closeUserModal());
    };

    useEffect(() => {
        if (address && signer && provider && chain) {
            if (switchNetwork && (chain.id !== getChainIdFromWindow())) {
                switchNetwork(ethers.utils.hexlify(getChainIdFromWindow()));
            }
            else {
                dispatch(updateWalletAddress(address));
                dispatch(updateProvider(provider));
                dispatch(updateSigner(signer));
                dispatch(updateChainId(chain))
                try {
                    connectWalletInit(signer);
                }
                catch (error) {
                    enqueueSnackbar(error.message, {
                        variant: "error",
                    });

                }
            }
        }
        if (!address) {
            dispatch(updateWalletAddress(null));
            dispatch(updateProvider(null));
            dispatch(updateSigner(null));
            dispatch(updateChainId(null))
            dispatch(updateIsInitializedContract(false));
        }
    }, [address, provider, signer, chain]);

    useEffect(() => {
        if (signer && (readFunction.length > 0) && isInitializedContract) {
            readViewCall(signer, readFunction);
        }
    }, [signer, readFunction, isInitializedContract]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    open={userModalOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            borderRadius: 10,
                            fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                            left: "auto !important",
                            bottom: "auto !important",
                        }
                    }}
                >
                    <DialogContent>

                        <div className="user-modal-wrapper" >
                            <div className="user-modal-account">
                                <div className="user-modal-title">
                                    {openConnectModal && (
                                        <button onClick={openConnectModal} type="button" className="common-button login-button">
                                            Connect wallet
                                        </button>
                                    )}

                                    {openAccountModal && (
                                        <button onClick={openAccountModal} type="button" className="common-button login-button">
                                            {isConnected && <div>{user}</div>}
                                        </button>
                                    )}
                                </div>
                                {openChainModal && (
                                    <button onClick={openChainModal} type="button" className="common-button chain-button">
                                        {chain?.name}
                                    </button>
                                )}
                            </div>
                            {/* {isConnected &&
                                <CheckOrderHistory />
                            } */}
                        </div>
                    </DialogContent>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
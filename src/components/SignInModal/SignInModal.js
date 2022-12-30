import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSignMessage } from 'wagmi'

import { closeSignInModal, openSignInModal } from "./SignInModalSlice";
import { cardClasses, titleClass } from "../muiStyle";
import { updateOrderSignData } from "../UserModal/UserModalSlice";
import { useSnackbar } from "notistack";
import { callViewFunction } from "../../contract_access_object/cao";

export const SignInModal = () => {
    const dispatch = useDispatch();
    const signInModal = useSelector(state => state.signInModal.signInModal);
    const orderSignData = useSelector(state => state.signInModal.orderSignData);
    const walletAddress = useSelector(state => state.userModal.walletAddress);
    const isInitializedContract = useSelector(state => state.userModal.isInitializedContract);
    const { enqueueSnackbar } = useSnackbar();
    const [ownerOf, setOwnerOf] = React.useState("");

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: 'Login to see the page details',
    })

    const handleReturn = () => {
        dispatch(closeSignInModal());
        window.history.back();
    };

    const handleClose = () => {
        dispatch(closeSignInModal());
    };

    const handleSignMessage = () => {
        if (!ownerOf) {
            enqueueSnackbar("You don't have the token", { variant: 'error' })
        }
        else {
            if (!orderSignData) {
                signMessage();
            }
        }
    }

    const readOwnerOf = async (user) => {
        const res = await callViewFunction(window.CONTRACT_ADDRESS, "balanceOf", [user]);
        console.log("readOwnerOf", parseInt(res));
        if (parseInt(res)) {
            setOwnerOf(res);
        }
    }

    useEffect(() => {
        if (window.SIGN_PAGE_PATH) {
            const href = window.location.href;
            const pathName = window.location.pathname;
            console.log("checkPath", href, pathName);
            if (pathName === window.SIGN_PAGE_PATH) {
                console.log("SIGN PAGE");
                dispatch(openSignInModal());
            }
        }
    }, [walletAddress])

    useEffect(() => {
        if (!(parseInt(ownerOf) > 0) && isInitializedContract) {
            readOwnerOf(walletAddress);
        }
    }, [ownerOf, walletAddress, isInitializedContract])

    useEffect(() => {
        if (isSuccess) {
            dispatch(updateOrderSignData(data));
            handleClose();
        }
        if (isError) {
            enqueueSnackbar('Sign Message Error', { variant: 'error' })
        }
    }, [isSuccess, data, isError])

    return (
        <>
            <Dialog
                open={signInModal}
                onClose={handleReturn}
                PaperProps={{
                    style: { borderRadius: 10, fontFamily: `"Roboto","Helvetica","Arial",sans-serif` }
                }}
            >
                <DialogTitle style={titleClass}>
                    <div className="common-title">
                        <h1>
                            Sign In
                        </h1>
                    </div>
                </DialogTitle>
                <DialogContent sx={cardClasses}>
                    <div className="function-call-wrapper">
                        <div className="function-call-input">
                            <button className="function-call-button" onClick={handleSignMessage} disabled={isLoading}>
                                Sign In
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
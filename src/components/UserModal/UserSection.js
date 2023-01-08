
import React, { useEffect } from "react";
import "./UserModal.css";
import "../mint.css";
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useDispatch, useSelector } from "react-redux";
import { updateChainId, updateIsInitializedContract, updateProvider, updateSigner, updateWalletAddress } from "./UserModalSlice";
import { useAccount, useEnsName, useNetwork, useSwitchNetwork, useProvider, useSigner } from "wagmi";
import { formatWalletAddress } from "../../utils";
import { connectWalletInit, getChainIdFromWindow, readViewCall } from "../../wallet/wallet";
import { useSnackbar } from "notistack";
import { ethers } from "ethers";

export const UserSection = () => {
    const dispatch = useDispatch();
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
        </div>
    )
}
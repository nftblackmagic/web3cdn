import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { closeFunctionCallModal } from "./FunctionCallSlice";

import "./FunctionCallView.css";
import { isMobile } from "web3modal";
import { titleClass } from "../muiStyle";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import * as _ from "lodash";
import { SELF_WALLET_SYMBOL } from "../../constants";

export const FunctionCallModal = () => {
    const dispatch = useDispatch();
    const functionCallModalOpen = useSelector(state => state.functionCallModal.functionCallModalOpen);
    const functionCallInfo = useSelector(state => state.functionCallModal.functionCallInfo);
    const walletAddress = useSelector(state => state.userModal.walletAddress);
    const chain = useSelector(state => state.userModal.chainId);
    const [args, setArgs] = React.useState({});
    const [argsValues, setArgsValues] = React.useState([]);
    const [price, setPrice] = React.useState();
    const { enqueueSnackbar } = useSnackbar();

    const isPayable = functionCallInfo.type === "payable";
    const cardClasses = isMobile() ? { minWidth: 275 } : { minWidth: 475 };

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: functionCallInfo.contractAddress,
        abi: [
            functionCallInfo.event,
        ],
        functionName: functionCallInfo.name,
        args: argsValues,
        chainId: chain?.id,
        overrides: {
            value: Number(price) ? ethers.utils.parseEther(price) : "0",
        },
        enabled: ((argsValues.length > 0) && (chain)),
    });
    const { data, error, isError, write } = useContractWrite(config);

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    const handleSetArgs = (name, value) => {
        setArgs({ ...args, [name]: value })
    }

    const handleClose = () => {
        dispatch(closeFunctionCallModal());
        setArgs({});
        setArgsValues([]);
        setPrice();
    };

    const reportError = (e) => {
        const msg = e.message;
        const regex = /reason="(.*?)",/;
        const found = msg.match(regex);
        if (found) {
            enqueueSnackbar(found[1], {
                variant: "error",
            });
        }
        else {
            enqueueSnackbar(msg.split("(")[0], {
                variant: "error",
            });
        }
    }

    const handleSubmit = () => {
        console.log("submit", config, args, argsValues);
        if (isPrepareError) {
            reportError(prepareError);
            return
        }
        write?.();
    }

    const handleInputDisabled = (input) => {
        if (functionCallInfo.inputArgs) {
            if (input.name in functionCallInfo.inputArgs) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }

    useEffect(() => {
        var argsValuesTmp = [];
        if (functionCallInfo.inputs) {
            for (var input of functionCallInfo.inputs) {
                if (args[input.name]) {
                    if (input.type.includes("[]")) {
                        try {
                            argsValuesTmp.push(JSON.parse(args[input.name]));
                        }
                        catch {
                            argsValuesTmp.push(args[input.name]);
                        }
                    }
                    else {
                        argsValuesTmp.push(args[input.name]);
                    }

                }
            }
        }
        setArgsValues(argsValuesTmp);
    }, [args, functionCallInfo.inputs])

    useEffect(() => {
        if (functionCallInfo.price && functionCallModalOpen) {
            setPrice(functionCallInfo.price);
        }
    }, [functionCallInfo.price, functionCallModalOpen])

    useEffect(() => {
        if (isError) {
            reportError(error);
        }
    }, [error, isError, enqueueSnackbar])

    useEffect(() => {
        if (functionCallInfo.inputs && functionCallInfo.inputArgs && functionCallModalOpen) {
            var argsTmp = {};
            for (var input of functionCallInfo.inputs) {
                if (input.name in functionCallInfo.inputArgs) {
                    if (functionCallInfo.inputArgs[input.name] === SELF_WALLET_SYMBOL) {
                        argsTmp[input.name] = walletAddress;
                        continue;
                    }
                    argsTmp[input.name] = functionCallInfo.inputArgs[input.name];
                }
            }
            setArgs(argsTmp);
        }
    }, [functionCallInfo.inputs, functionCallInfo.inputArgs, functionCallModalOpen])

    return (
        <>
            <Dialog
                open={functionCallModalOpen}
                PaperProps={{
                    style: { borderRadius: 10, fontFamily: `"Roboto","Helvetica","Arial",sans-serif` }
                }}
            >
                <DialogTitle style={titleClass}>
                    <div className="common-title">
                        <h1>
                            Review my transaction
                        </h1>
                        <button onClick={handleClose} style={{ border: "none", background: "none", cursor: "pointer", width: "auto", height: "auto" }}>
                            <AiOutlineCloseCircle size={25} />
                        </button>
                    </div>
                </DialogTitle>
                <DialogContent sx={cardClasses}>
                    <div className="function-call-wrapper">
                        <div className="function-call-input">
                            {
                                functionCallInfo.inputs && functionCallInfo.inputs.map((input, index) => {
                                    return (
                                        <div key={index} className="function-input-wrapper">
                                            <label >{input.name}</label>
                                            <input
                                                id={input.name}
                                                disabled={handleInputDisabled(input)}
                                                onChange={(e) => handleSetArgs(input.name, e.target.value)}
                                                // placeholder="420"
                                                value={args[input.name] || ""}
                                            />
                                        </div>
                                    )
                                })
                            }
                            {isPayable &&
                                <div className="function-input-wrapper">
                                    <label >Price</label>
                                    <input
                                        disabled={functionCallInfo.price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.05"
                                        value={price || ""}
                                    />
                                    <label >(ether)</label>
                                </div>
                            }
                        </div>
                        <button
                            disabled={isLoading}
                            onClick={handleSubmit}
                        >
                            {isLoading ?
                                <>
                                    Waiting...
                                    <CircularProgress color="inherit" size="1rem" />
                                </>
                                :
                                "Confirm"
                            }
                        </button>
                    </div>
                    {isSuccess && (
                        <div className="etherscan-wrapper">
                            {"Transcation success! View on "}
                            <a href={`${_.get(chain, ["blockExplorers", "default", "url"])}/tx/${data.hash}`} target="_blank" rel="noreferrer">{_.get(chain, ["blockExplorers", "default", "name"])}</a>
                        </div>
                    )}

                </DialogContent>
            </Dialog>
        </>
    )
}
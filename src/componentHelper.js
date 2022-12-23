import Web3 from 'web3';
import { fetchAbiOfContractAt } from "./wallet/abiHelper";
import { getChainID } from "./wallet/utils";

const web3Utils = new Web3();

const event721Transfer =
{
    "anonymous": false,
    "inputs": [
        { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "to", "type": "address" },
        { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "event"
}

export function getTransactionReceiptMined(provider, txHash, interval) {
    const transactionReceiptAsync = function (resolve, reject) {
        // console.log("getTransactionReceiptMined", store.getState().userModal.provider);
        provider.getTransactionReceipt(txHash).then((receipt) => {
            if (receipt == null) {
                setTimeout(
                    () => transactionReceiptAsync(resolve, reject),
                    interval ? interval : 500);
            } else {
                resolve(receipt);
            }
        }).catch((error) => {
            reject(error);
        });
    };

    if (Array.isArray(txHash)) {
        return Promise.all(txHash.map(
            oneTxHash => getTransactionReceiptMined(provider, oneTxHash, interval)));
    } else if (typeof txHash === "string") {
        return new Promise(transactionReceiptAsync);
    } else {
        throw new Error("Invalid Type: " + txHash);
    }
};

export const decodeLogs = async (logs, logicAddr) => {
    const abi = await fetchAbiOfContractAt(logicAddr, getChainID());
    return logs.map(log => {
        const event = abi.find(e => {
            var signature = e.name + "(" + e.inputs.map(function (input) { return input.type; }).join(",") + ")";
            var hash = web3Utils.utils.sha3(signature);
            return e.type === 'event' && hash === log.topics[0]
        });
        if (!event) {
            return null;
        }
        const data = log.data;
        const values = web3Utils.eth.abi.decodeLog(event.inputs, data, log.topics.slice(1));
        const result = {};
        event.inputs.forEach((input, i) => {
            result[input.name] = values[i];
        });
        return result;
    });
};

export const decodeLogsBy = async (logs, logicAddr, eventName) => {
    const abi = await fetchAbiOfContractAt(logicAddr, getChainID());
    return logs.map(log => {
        var event = abi.find(e => {
            return e.type === 'event' && e.name === eventName
        });
        if (!event) {
            if (eventName === "Transfer") {
                event = event721Transfer;
            }
            else {
                return null;
            }
        }
        const data = log.data;
        try {
            const values = web3Utils.eth.abi.decodeLog(event.inputs, data, log.topics.slice(1));
            const result = {};
            event.inputs.forEach((input, i) => {
                result[input.name] = values[i];
            });
            return result;
        }
        catch {
            return null;
        }

    });
};

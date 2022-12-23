import * as Web3 from 'web3';
import { getChainIdFromWindow } from './wallet/wallet';
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

export const isMobile = () => /Mobi/i.test(window.navigator.userAgent)
    || /iPhone|iPod|iPad/i.test(navigator.userAgent);

export const objectMap = (object, mapFn) => {
    return Object.keys(object).reduce((result, key) => {
        result[key] = mapFn(object[key]);
        return result
    }, {})
}

export const normalizeURL = (u) => ((new URL(u).host).replace('www.', ''))

export const parseTxError = (error) => {
    try {
        return {
            code: error.code ?? JSON.parse(`{${error.message.split("{")[1]}`).code,
            message: error.message.split("{")[0].trim()
        };
    } catch (parse_error) {
        console.log("Failed to parse error code and message")
        console.log("Original error:", error)
        return {
            code: undefined, message: error?.toString()
        }
    }
}

// Avoid big number errors without using external libraries
export const formatValue = (v) => v.toLocaleString('fullwide', {
    useGrouping: false
});

export const roundToDecimal = (n, d) => {
    return +n.toFixed(d)
}

export const setButtonText = (btn, text) => {
    if (btn.childElementCount > 0) {
        btn.children[0].textContent = text;
    } else {
        btn.textContent = text;
    }
}

export const formatWalletAddress = (address) => {
    return address && `${address.substring(0, 4)}...${address.substring(38)}`;
};

export const convertWeiToETH = (wei) => {
    return Web3.utils.fromWei(wei, 'ether')
}

export const etherscanLink = async () => {
    const chainID = getChainIdFromWindow();
    switch (chainID) {
        case 1: return "https://etherscan.io/tx/";
        case 5: return "https://goerli.etherscan.io/tx/";
        case 11155111: return "https://sepolia.etherscan.io/tx/";
        default: break;
    }
}

export const getProof = (addresses, contract, address, round) => {
    console.log("getProof", contract, address, round);
    const leafNodes = addresses.map(address => Web3.utils.soliditySha3(
        { t: 'address', v: contract },
        { t: 'address', v: address },
        { t: 'uint256', v: round }
    ));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

    const leaf = Web3.utils.soliditySha3(
        { t: 'address', v: contract },
        { t: 'address', v: address },
        { t: 'uint256', v: round }
    );
    const proof = merkleTree.getHexProof(leaf);
    console.log("PROOF", proof);
    return proof;
}

export const setAddr = (contractAddr, logicAddr) => {
    if (contractAddr && logicAddr) {
        return [contractAddr, logicAddr]
    }
    else if (contractAddr) {
        return [contractAddr, contractAddr]
    }
    else {
        return [window.CONTRACT_ADDRESS, window.LOGIC_ADDRESS]
    }
}
